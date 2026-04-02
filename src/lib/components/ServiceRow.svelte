<script>
  import EndpointRow from './EndpointRow.svelte';
  import Button from '$lib/components/Button.svelte';
  import CardRow from '$lib/components/CardRow.svelte';

  let {
    service,
    expandedService,
    onToggleService = () => {},
    selectedEndpoints,
    toggleEndpoint
  } = $props();
</script>

<!-- Service row -->
<CardRow>
  <div class="flex justify-between w-full pl-6 items-center">
    <div>{service.port}/{service.protocol} - {service.name}</div>
    <div class="flex gap-2">
      <Button
        label={expandedService === service.id ? "Collapse Service" : "Expand Service"}
        variant="tertiary"
        size="sm"
        onclick={() => onToggleService(service.id)}
      />
      <Button
        label="Run Dirb Scan"
        variant="tertiary"
        size="sm"
        onclick={() => {}}
      />
    </div>
  </div>
</CardRow>

<!-- Endpoint list -->
{#if expandedService === service.id}
  {#each service.endpoints as endpoint}
    <EndpointRow
      {endpoint}
      selected={selectedEndpoints[endpoint.id] || false}
      onToggle={() => toggleEndpoint(endpoint.id)}
    />
  {/each}
{/if}