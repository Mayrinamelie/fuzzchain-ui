<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Button from '$lib/components/Button.svelte';
  import CreateProjectModal from '$lib/components/modals/CreateProjectModal.svelte';

  let openCreateModal = $state(false);
</script>

<div class="flex">
  <Sidebar activePage="home" />

  <div class="flex-1 p-6">
    <div class="flex gap-3">
      <Button
        label="Create Project"
        variant="primary"
        onclick={() => {
          console.log("Create clicked");
          openCreateModal = true;
        }}
      />

      <Button
        label="Import Project"
        variant="primary"
      />
    </div>
  </div>
</div>

<CreateProjectModal
  open={openCreateModal}
  onClose={() => {
    openCreateModal = false;
  }}
/>