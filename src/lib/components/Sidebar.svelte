<script>
  let { activePage = 'home' } = $props();
</script>

<aside class="w-48 h-screen bg-white border-r border-gray-200 flex flex-col px-4 py-6">

  <span class="font-bold text-gray-900 text-sm mb-6">Fuzzchain</span>

  <nav class="flex flex-col gap-1">
    <a href="/" class="
      flex items-center gap-2 px-3 py-2 rounded text-sm
      {activePage === 'home' ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-600 hover:bg-gray-50'}
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      Home
    </a>

    <a href="/project" class="
      flex items-center gap-2 px-3 py-2 rounded text-sm
      {activePage === 'project' ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-600 hover:bg-gray-50'}
    ">
      ← Back to Project
    </a>
  </nav>

</aside>