<script>
  let { checked = $bindable(false), label = "", onchange = () => {} } = $props();
</script>

<label class="flex items-center gap-2 cursor-pointer select-none">
  <input
    type="checkbox"
    class="w-4 h-4"
    bind:checked
    onchange={onchange}
  />
  <span>{label}</span>
</label>