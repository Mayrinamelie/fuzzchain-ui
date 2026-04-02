<script>
  let { endpoint, selected = false, onToggle = () => {} } = $props();
</script>

<div class="flex justify-between w-full pl-12 py-2 border-b border-gray-100 items-center bg-gray-50">
  <div class="flex items-center gap-3">
    <input
      type="checkbox"
      class="w-4 h-4"
      checked={selected}
      onchange={() => onToggle()}
    />
    <div>
      <span class="font-medium">{endpoint.name}</span>
      <span class="ml-3 text-xs px-2 py-0.5 rounded {endpoint.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}">
        {endpoint.status}
      </span>
    </div>
  </div>
</div>