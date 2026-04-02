<script>
  let { 
    label = "", 
    placeholder = "",
    value = $bindable(""),
    type = "text"
  } = $props();
</script>

<div>
  <label class="block text-sm font-medium text-gray-700 mb-1">
    {label}
  </label>
  <input
    {type}
    {placeholder}
    bind:value
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
  />
</div>