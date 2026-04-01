<script>
  let { indent = false, class: cls = '', children } = $props();
</script>

<div
  class="grid items-center gap-4 px-6 py-3 {indent ? 'pl-12 bg-gray-50 text-sm text-gray-500' : ''} {cls}"
  style="grid-template-columns: var(--card-columns, 1fr)"
>
  {@render children?.()}
</div>