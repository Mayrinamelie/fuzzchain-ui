<script>
  let { title = '', columns = null, class: cls = '', children } = $props();
</script>

<div class="rounded-xl border border-gray-200 bg-white shadow-sm {cls}">
  {#if title}
    <h3 class="px-6 py-4 text-sm font-semibold text-gray-700">{title}</h3>
  {/if}
  <div
    class="divide-y divide-gray-200"
    style={columns ? `--card-columns: ${columns}` : ''}
  >
    {@render children?.()}
  </div>
</div>