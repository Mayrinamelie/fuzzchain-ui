<script>
  import { page } from '$app/stores';

  import Sidebar from '$lib/components/Sidebar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardRow from '$lib/components/CardRow.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';

  // UI State for the target list
  let searchQuery = $state('');
  let selectedTargets = $state(new Set());
  let currentProjectId = $derived($page.params.id);
  const project = { id: currentProjectId, name: "Demo Project" };

  function toggleTarget(id) {
    if (selectedTargets.has(id)) selectedTargets.delete(id);
    else selectedTargets.add(id);
  }
</script>

<div class="flex min-h-screen bg-gray-50">
<Sidebar activePage="fuzzing" projectId={currentProjectId} />

  <main class="flex-1 p-8">
    
    <div class="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
      <div>
        <h1 class="text-xl font-bold">Demo Project</h1>
        <p class="text-sm text-gray-500">ID: #{currentProjectId}</p>
      </div>
      <Button label="Start Testing" variant="primary" />
    </div>

    <div class="space-y-6">
      <h2 class="text-lg font-bold text-gray-900">Target List</h2>

      <div class="flex items-center gap-4">
        <div class="w-80">
          <TextField placeholder="Search targets..." bind:value={searchQuery} />
        </div>

        <Button label="Filter" variant="primary" />

        <Button
          label="Add Payload to Selected Targets"
          variant="primary"
          disabled={selectedTargets.size === 0}
        />

        <div class="ml-auto flex gap-2">
          <Button label="..." variant="primary" size="sm" />
        </div>
      </div>

      <Card columns="50px 1.5fr 1fr 2fr auto">
        
        <CardRow class="text-xs font-bold text-gray-400 uppercase">
          <span>Sel</span>
          <span>Host</span>
          <span>Service</span>
          <span>Endpoint</span>
          <span class="text-right">Actions</span>
        </CardRow>

        {#each [1, 2, 3, 4] as id}
          <CardRow>
            <Checkbox checked={selectedTargets.has(id)} onchange={() => toggleTarget(id)} />
            <span class="text-primary text-s">192.168.1.1</span>
            <span class="text-primary text-s">HTTPS</span>
            <span class="text-primary text-s">/api/v1/login</span>
            <div class="flex justify-end">
              <Button label="Add Payload" variant="tertiary" size="sm" />
            </div>
          </CardRow>
        {/each}
      </Card>
    </div>
  </main>
</div>
