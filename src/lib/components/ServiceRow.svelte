<script>
  import EndpointRow from './EndpointRow.svelte';
  import Button from '$lib/components/Button.svelte';
  import CardRow from '$lib/components/CardRow.svelte';
  import ModalForm from '$lib/components/ModalForm.svelte';
  import ModalActions from '$lib/components/ModalActions.svelte';
  import TextField from '$lib/components/TextField.svelte';

  let {
    service,
    expandedService = false,
    onToggleService = () => {},
    selectedEndpoints = {},
    toggleEndpoint = () => {}
  } = $props();

  // 🟢 Use $state for modal visibility and form
  let showAddEndpoint = $state(false);
  let newEndpoint = $state({ name: '' });

  function openAddEndpoint() {
    newEndpoint = { name: '' };
    showAddEndpoint = true;
  }

  function handleAddEndpoint() {
    console.log('Adding endpoint to service:', service.id, newEndpoint);
    // Add to service.endpoints
    service.endpoints.push({
      id: 'e' + (service.endpoints.length + 1),
      name: newEndpoint.name,
      status: 'Inactive'
    });
    showAddEndpoint = false;
  }
</script>

<CardRow>
  <div class="flex justify-between w-full pl-6 items-center">
    <div>{service.port}/{service.protocol} - {service.name}</div>
    <div class="flex gap-2">
      <Button
        label="Run Dirb Scan"
        variant="tertiary"
        size="sm"
        onclick={() => {}}
      />
      <Button
        label="Add Endpoint"
        variant="secondary"
        size="sm"
        onclick={openAddEndpoint}
      />
      <Button
        label={expandedService ? "Collapse Service" : "Expand Service"}
        variant="tertiary"
        size="sm"
        onclick={() => onToggleService()}
      />
    </div>
  </div>
</CardRow>

{#if expandedService}
  {#each service.endpoints as endpoint}
    <EndpointRow
      {endpoint}
      selected={selectedEndpoints[endpoint.id] || false}
      onToggle={() => toggleEndpoint(endpoint.id)}
    />
  {/each}
{/if}

<!-- Add Endpoint Modal -->
<ModalForm open={showAddEndpoint} title="Add Endpoint" onClose={() => showAddEndpoint = false}>
  <div class="space-y-4">
    <TextField label="Endpoint Name" placeholder="/api/login" bind:value={newEndpoint.name} />
  </div>
  <ModalActions
    primaryLabel="Add Endpoint"
    secondaryLabel="Cancel"
    onPrimary={handleAddEndpoint}
    onSecondary={() => showAddEndpoint = false}
    primaryDisabled={!newEndpoint.name}
  />
</ModalForm>