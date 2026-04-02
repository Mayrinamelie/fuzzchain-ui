<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import Sidebar from '$lib/components/Sidebar.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardRow from '$lib/components/CardRow.svelte';
  import Button from '$lib/components/Button.svelte';
  import ModalForm from '$lib/components/ModalForm.svelte';
  import ModalActions from '$lib/components/ModalActions.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import ServiceRow from '$lib/components/ServiceRow.svelte';
  import FileUpload from '$lib/components/FileUpload.svelte';

  // Get project ID from URL
  let currentProjectId = $derived($page.params.id);

  // State
  let expandedTargets = $state({});
  let expandedServices = $state({});
  let selectedEndpoints = $state({});
  let showCreateHost = $state(false);
  let showAddService = $state(false);
  let showIngestScans = $state(false);
  let selectedTargetId = $state(null);

  // Form state
  let newHost = $state({ ip: '', port: '', protocol: 'tcp', service: '' });
  let newService = $state({ port: '', protocol: 'tcp', name: '', description: '' });
  let scanFile = $state(null);
  let scanType = $state('nmap');

  // Mock project data
  const project = { id: currentProjectId, name: "Demo Project" };

  // Mock targets
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
            { id: "e3", name: "ssh-root", status: "Active" }
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
            { id: "e4", name: "/secure", status: "Inactive" }
          ]
        }
      ]
    }
  ];

  // Functions
  function toggleTarget(targetId) {
    expandedTargets = { ...expandedTargets, [targetId]: !expandedTargets[targetId] };
    if (!expandedTargets[targetId]) {
      expandedServices = { ...expandedServices, [targetId]: {} };
    }
  }

  function toggleService(targetId, serviceId) {
    const servicesForTarget = expandedServices[targetId] || {};
    expandedServices = {
      ...expandedServices,
      [targetId]: {
        ...servicesForTarget,
        [serviceId]: !servicesForTarget[serviceId]
      }
    };
  }

  function toggleEndpoint(endpointId) {
    selectedEndpoints = { ...selectedEndpoints, [endpointId]: !selectedEndpoints[endpointId] };
  }

  function openCreateHost() {
    newHost = { ip: '', port: '', protocol: 'tcp', service: '' };
    showCreateHost = true;
  }

  function openAddService(targetId) {
    selectedTargetId = targetId;
    newService = { port: '', protocol: 'tcp', name: '', description: '' };
    showAddService = true;
  }

  function openIngestScans() {
    scanFile = null;
    scanType = 'nmap';
    showIngestScans = true;
  }

  function handleCreateHost() {
    console.log('Creating host:', newHost);
    showCreateHost = false;
  }

  function handleAddService() {
    console.log('Adding service to target:', selectedTargetId, newService);
    showAddService = false;
  }

  function handleIngestScans() {
    console.log('Ingesting scan:', { file: scanFile, type: scanType });
    showIngestScans = false;
  }

  function handleFileSelect(file) {
    scanFile = file;
  }
</script>

<div class="flex min-h-screen">
  <Sidebar />

  <div class="flex-1 p-6">
    <!-- Project Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold">{project.name}</h1>
      <p class="text-gray-500">Project ID: {currentProjectId}</p>

      <!-- Action Buttons -->
      <div class="flex gap-3 mt-4 flex-wrap">
        <Button label="Create Host" variant="primary" onclick={openCreateHost} />
        <Button label="Ingest Scans" variant="primary" onclick={openIngestScans} />
        <Button label="View Topology" variant="primary" onclick={() => {}} />
        <Button label="Run Tests" variant="primary" onclick={() => goto('/fuzzing')} />
        <Button label="View Report" variant="primary" onclick={() => {}} />
      </div>
    </div>

    <!-- Targets Table -->
    <Card>
      {#each targets as target}
        <CardRow>
          <div class="flex justify-between items-center w-full">
            <div>
              <div class="font-semibold">{target.host}</div>
              <div class="text-sm text-gray-500">{target.status}</div>
            </div>

            <div class="flex gap-2">
              <Button label="Scan Host" variant="secondary" onclick={() => {}} />
              <Button
                label="Add Service"
                variant="secondary"
                onclick={() => openAddService(target.id)}
              />
              <Button
                label={expandedTargets[target.id] ? "Collapse" : "Expand Target"}
                variant="secondary"
                onclick={() => toggleTarget(target.id)}
              />
            </div>
          </div>
        </CardRow>

        {#if expandedTargets[target.id]}
          {#each target.services as service}
            <ServiceRow
              {service}
              expandedService={expandedServices[target.id]?.[service.id] || false}
              onToggleService={() => toggleService(target.id, service.id)}
              {selectedEndpoints}
              {toggleEndpoint}
            />
          {/each}
        {/if}
      {/each}
    </Card>
  </div>
</div>

<!-- Create Host Modal -->
<ModalForm open={showCreateHost} title="Create Host" onClose={() => showCreateHost = false}>
  <div class="space-y-4">
    <TextField label="IP Address" placeholder="192.168.1.100" bind:value={newHost.ip} />
    <TextField label="Port" placeholder="80" bind:value={newHost.port} />
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Protocol</label>
      <select bind:value={newHost.protocol} class="w-full px-3 py-2 border rounded-md">
        <option value="tcp">TCP</option>
        <option value="udp">UDP</option>
      </select>
    </div>
    <TextField label="Service Name (Optional)" placeholder="HTTP, SSH, etc." bind:value={newHost.service} />
  </div>
  <ModalActions
    primaryLabel="Create Host"
    secondaryLabel="Cancel"
    onPrimary={handleCreateHost}
    onSecondary={() => showCreateHost = false}
    primaryDisabled={!newHost.ip || !newHost.port}
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

<!-- Ingest Scans Modal -->
<ModalForm open={showIngestScans} title="Ingest Scan Results" width="max-w-2xl" onClose={() => showIngestScans = false}>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Scan Type</label>
      <select bind:value={scanType} class="w-full px-3 py-2 border rounded-md">
        <option value="nmap">Nmap XML</option>
        <option value="masscan">Masscan JSON</option>
        <option value="nuclei">Nuclei JSON</option>
        <option value="nessus">Nessus XML</option>
        <option value="burp">Burp Suite XML</option>
        <option value="generic">Generic JSON/XML</option>
      </select>
    </div>
    <FileUpload label="Scan Results" onFileSelect={handleFileSelect} acceptedTypes=".xml,.json,.txt" />
  </div>
  <ModalActions
    primaryLabel="Ingest Scan"
    secondaryLabel="Cancel"
    onPrimary={handleIngestScans}
    onSecondary={() => showIngestScans = false}
    primaryDisabled={!scanFile}
  />
</ModalForm>  