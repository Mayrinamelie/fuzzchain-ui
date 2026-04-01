<script>
  let {
    label = "",
    placeholder = "",
    value = $bindable(""),
    type = "text"
  } = $props();
</script>

<div class="w-full">
  <label class="mb-1 block text-sm font-medium text-gray-600">
    {label}
  </label>

  <input
    bind:value
    {type}
    {placeholder}
    class="w-full rounded-md border border-violet-500 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-violet-700 focus:ring-2 focus:ring-violet-200"
  />
</div>