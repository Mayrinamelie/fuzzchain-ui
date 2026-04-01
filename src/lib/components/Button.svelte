<script>
  let { label = 'Button', variant = 'primary', onclick = () => {} } = $props();
</script>

<button
  onclick={onclick}
  class="
    px-3 py-1.5 rounded text-xs font-semibold transition-colors
    {variant === 'primary' ? 'bg-gray-900 text-white hover:bg-gray-700' : ''}
    {variant === 'secondary' ? 'bg-gray-900 text-white hover:bg-gray-700' : ''}
    {variant === 'outline' ? 'border border-gray-500 text-gray-300 hover:bg-gray-700' : ''}
    {variant === 'danger' ? 'bg-gray-900 text-white hover:bg-gray-700' : ''}
  "
>
  {label}
</button>