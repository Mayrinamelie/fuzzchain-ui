<script>
  let { label = 'Click me', variant = 'primary', onclick = () => {} } = $props();
</script>

<button
  onclick={onclick}
  class="
    px-4 py-2 rounded font-semibold text-sm transition-colors
    {variant === 'primary' ? 'bg-red-600 text-white hover:bg-red-700' : ''}
    {variant === 'secondary' ? 'bg-gray-700 text-white hover:bg-gray-600' : ''}
    {variant === 'outline' ? 'border border-gray-500 text-gray-300 hover:bg-gray-700' : ''}
    {variant === 'danger' ? 'bg-red-900 text-red-200 hover:bg-red-800' : ''}
  "
>
  {label}
</button>