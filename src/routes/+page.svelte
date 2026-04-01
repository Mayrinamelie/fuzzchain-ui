<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Button from '$lib/components/Button.svelte';
</script>

<div class="flex">
  <Sidebar activePage="home" />
  
  <div class="flex-1 p-6">
    <div class="flex gap-3">
      <Button label="Create Project" variant="primary" />
      <Button label="Import Project" variant="secondary" />
    </div>
  </div>
</div>