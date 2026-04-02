<script>
  /**
   * SECTION: ROUTING & NAVIGATION
   * Handles dynamic project IDs and cross-page navigation.
   */
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  /**
   * SECTION: GLOBAL COMPONENTS
   * UI LEAD NOTE: Consistency here ensures the nested rows and modals 
   * feel like a single cohesive application.
   */
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardRow from '$lib/components/CardRow.svelte';
  import Button from '$lib/components/Button.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import ServiceRow from '$lib/components/ServiceRow.svelte';
  import FileUpload from '$lib/components/FileUpload.svelte';
  
  // Modal wrappers for standardized popup behavior
  import ModalForm from '$lib/components/ModalForm.svelte';
  import ModalActions from '$lib/components/ModalActions.svelte';

  /**
   * SECTION: STATE MANAGEMENT
   * Tracks expanded view states and modal visibility using Svelte 5 runes.
   */
  let currentProjectId = $derived($page.params.id);
  let expandedTargets = $state({});
  let expandedServices = $state({});
  let selectedEndpoints = $state({});
  
  // Modal visibility states
  let showCreateHost = $state(false);
  let showAddService = $state(false);
  let showIngestScans = $state(false);
  let selectedTargetId = $state(null);

  /**
   * SECTION: FORM DATA
   * Temporary stFrage for modal inputs.
   */
  let newHost = $state({ ip: '', port: '', protocol: 'tcp', service: '' });
  let newService = $state({ port: '', protocol: 'tcp', name: '', description: '' });
  let scanFile = $state(null);
  let scanType = $state('nmap');

  /**
   * SECTION: MOCK DATA
   * Realistic security data for UI testing.
   */
const project = { id: currentProjectId, name: "Demo Project" };
const targets = [
    {
      id: "t1",
      host: "192.168.1.10",
      status: "Active",
      services: [
        {
          id: "s1", port: 80, protocol: "tcp", name: "HTTP",
          endpoints: [
            { id: "e1", name: "/login", status: "Active" },
            { id: "e2", name: "/register", status: "Inactive" }
          ]
        },
        {
          id: "s2", port: 22, protocol: "tcp", name: "SSH",
          endpoints: [
            { id: "e3", name: "auth-log", status: "Active" }
          ]
        }
      ]
    },
    {
      id: "t2",
      host: "192.168.1.11",
      status: "Inactive",
      services: [
        {
          id: "s3", port: 443, protocol: "tcp", name: "HTTPS",
          endpoints: [
            { id: "e4", name: "/api/v1/status", status: "Active" },
            { id: "e5", name: "/admin", status: "Inactive" }
          ]
        }
      ]
    }
  ];

  /**
   * SECTION: UI LOGIC
   * Functionality for toggling views and handling modal submissions.
   */
  function toggleTarget(targetId) {
    expandedTargets = { ...expandedTargets, [targetId]: !expandedTargets[targetId] };
    if (!expandedTargets[targetId]) {
      expandedServices = { ...expandedServices, [targetId]: {} };
    }
  }
  function openAddService(targetId) {
    selectedTargetId = targetId;
    newService = { port: '', protocol: 'tcp', name: '', description: '' };
    showAddService = true;
  }


  function toggleService(targetId, serviceId) {
    const servicesForTarget = expandedServices[targetId] || {};
    expandedServices = {
      ...expandedServices,
      [targetId]: { ...servicesForTarget, [serviceId]: !servicesForTarget[serviceId] }
    };
  }
  

  function handleCreateHost() { showCreateHost = false; }
  function handleAddService() {
    console.log('Adding service to target:', selectedTargetId, newService);
    showAddService = false;
  }
  function handleIngestScans() { showIngestScans = false; }
</script>

<div class="flex min-h-screen bg-gray-50">
  <Sidebar activePage="projects" />

  <main class="flex-1 p-8">
    <header class="mb-8 border-b border-gray-200 pb-4">
      <h1 class="text-xl font-bold">{project.name}</h1>
      <p class="text-sm text-gray-500"> ID: #{currentProjectId}</p>

      <div class="flex gap-3 mt-6">
        <Button label="Create Host" onclick={() => showCreateHost = true} />
        <Button label="Ingest Scans"  onclick={() => showIngestScans = true} />
        <Button label="View Topology"/>
        <Button label="Run Tests" onclick={() => goto(`/fuzzing/${project.id}`)} />
        <Button label="View Report" />
      </div>
    </header>

    <section class="space-y-4">
      <h2 class="text-lg font-bold text-gray-900">Infrastructure Overview</h2>
      
      <Card>
        {#each targets as target}
          <CardRow>
            <div class="flex justify-between items-center w-full px-2">
              <div>
                <div class="font-semibold text-gray-900 text-lg">{target.host}</div>
                <div class="text-xs font-bold uppercase text-gray-400">{target.status}</div>
              </div>

              <div class="flex gap-2">
                <Button
                  label = "Scan Host"
                  variant = "tertiary"
                  size = "sm"
                />
                <Button 
                  label="Add Service" 
                  variant="tertiary" 
                  size="sm" 
                  onclick={() => openAddService(target.id)} />
                <Button 
                  label={expandedTargets[target.id] ? "Collapse" : "Expand Target"} 
                  variant="tertiary" 
                  size="sm" 
                  onclick={() => toggleTarget(target.id)} 
                />
              </div>
            </div>
          </CardRow>

          {#if expandedTargets[target.id]}
            <div class="bg-gray-50/50 border-b border-gray-100">
              {#each target.services as service}
                <ServiceRow
                  {service}
                  expandedService={expandedServices[target.id]?.[service.id] || false}
                  onToggleService={() => toggleService(target.id, service.id)}
                  {selectedEndpoints}
                  toggleEndpoint={(id) => selectedEndpoints[id] = !selectedEndpoints[id]}
                />
              {/each}
            </div>
          {/if}
        {/each}
      </Card>
    </section>
  </main>
</div>

<ModalForm open={showCreateHost} title="Create Host" onClose={() => showCreateHost = false}>
  <div class="space-y-4 py-4">
    <TextField label="IP Address" placeholder="192.168.1.100" bind:value={newHost.ip} />
    <TextField label="Port" placeholder="80" bind:value={newHost.port} />
    <TextField label="Service Name" placeholder="HTTP, SSH, etc." bind:value={newHost.service} />
  </div>
  <ModalActions 
    primaryLabel="Create Host" 
    onPrimary={handleCreateHost} 
    onSecondary={() => showCreateHost = false} 
    primaryDisabled={!newHost.ip || !newHost.port}
  />
</ModalForm>

<ModalForm open={showIngestScans} title="Ingest Scan Results" onClose={() => showIngestScans = false}>
  <div class="space-y-4 py-4">
    <FileUpload label="Select Scan File (.xml, .json)" onFileSelect={(f) => scanFile = f} />
  </div>
  <ModalActions 
    primaryLabel="Ingest Scan"
    onPrimary={handleIngestScans} 
    onSecondary={() => showIngestScans = false} 
    primaryDisabled={!scanFile}
  />
</ModalForm>

<!-- Add Service Modal -->
<ModalForm open={showAddService} title="Add Service" onClose={() => showAddService = false}>
  <div class="space-y-4">
    <TextField label="Port" placeholder="443" bind:value={newService.port} />
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Protocol</label>
      <select bind:value={newService.protocol} class="w-full px-3 py-2 border rounded-md">
        <option value="tcp">TCP</option>
        <option value="udp">UDP</option>
      </select>
    </div>
    <TextField label="Service Name" placeholder="HTTPS, MySQL, etc." bind:value={newService.name} />
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
      <textarea bind:value={newService.description} class="w-full px-3 py-2 border rounded-md resize-none" rows="3" placeholder="Additional details..." />
    </div>
  </div>
  <ModalActions
    primaryLabel="Add Service"
    secondaryLabel="Cancel"
    onPrimary={handleAddService}
    onSecondary={() => showAddService = false}
    primaryDisabled={!newService.port || !newService.name}
  />
</ModalForm>
