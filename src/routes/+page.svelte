<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardRow from '$lib/components/CardRow.svelte';
  import CreateProjectModal from '$lib/components/modals/CreateProjectModal.svelte';

  let openCreateModal = $state(false);
</script>

<div class="flex">
  <!-- activePage tells the sidebar which item to highlight -->
  <Sidebar activePage="home" />

  <div class="flex-1 p-6 space-y-6">
    <p>don't mind this page im using it to test components sorry</p>

    <div class="flex gap-3">
      <!-- variant types: primary, secondary, outline, danger -->
      <Button
        label="Create Project"
        variant="primary"
        onclick={() => { openCreateModal = true; }}
      />

      <Button
        label="Import Project"
        variant="primary"
      />
    </div>

    <!-- columns sets the grid for every row, auto =fits the content -->
    <Card title="test card" columns="1fr 1fr 1fr auto">

      <!-- each CardRow is one row, children line up with the columns above -->
      <CardRow>
        <span>hello</span>
        <span>world</span>
        <span>world</span>

        <Button label="button" variant="primary" />
      </CardRow>

      <CardRow>
        <span>hola</span>
        <span>mundo</span>
        <span>mundo</span>
        <Button label="button" variant="primary" />
      </CardRow>

    </Card>
  </div>
</div>

<!-- open/onClose controls wether the modal shows up -->
<CreateProjectModal
  open={openCreateModal}
  onClose={() => { openCreateModal = false; }}
/>