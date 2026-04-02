<script>
  let { label = 'Button', variant = 'primary', size = 'md', onclick = () => {} } = $props();
</script>

<button onclick={onclick}
  class="
    rounded font-semibold transition-colors
    {size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-xs'}
    {variant === 'primary' ? 'bg-gray-900 text-white hover:bg-gray-700' : ''}
    {variant === 'secondary' ? 'bg-gray-200 text-black hover:bg-gray-300' : ''}
    {variant === 'outline' ? 'border border-gray-500 text-gray-300 hover:bg-gray-700' : ''}
    {variant === 'danger' ? 'bg-gray-900 text-white hover:bg-gray-700' : ''}
    {variant === 'tertiary' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : ''}
  ">
  {label}
</button>