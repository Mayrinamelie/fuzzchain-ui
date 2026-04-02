<script>
  import { goto } from '$app/navigation';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import CardRow from '$lib/components/CardRow.svelte';
  import TextField from '$lib/components/TextField.svelte'; // Corrected name
  import CreateProjectModal from '$lib/components/modals/CreateProjectModal.svelte';
  import ImportProjectModal from '$lib/components/modals/ImportProjectModal.svelte';
  import ExportProjectModal from '$lib/components/modals/ExportProjectModal.svelte';

  let openCreateModal = $state(false);
  let openImportModal = $state(false);
  let openExportModal = $state(false);
  let selectedProjectName = $state('');

  let projects = [
    { id: '1', name: 'Project Alpha', created: '01/01/2026', modified: '01/15/2026' },
    { id: '2', name: 'Project Beta', created: '01/05/2026', modified: '01/20/2026' },
  ];

  function openExportPopup(projectName) {
    selectedProjectName = projectName;
    openExportModal = true;
  }
</script>

<div class="flex min-h-screen bg-gray-50">
  <Sidebar activePage="home" />

  <main class="flex-1 p-8">
    <header class="mb-8 border-b border-gray-200 pb-4">
      <h1 class="text-xl font-bold">Fuzzchain Dashboard</h1>
    </header>

    <section class="flex justify-between items-center mb-10">
      <div class="flex gap-4">
        <Button label="Create Project" onclick={() => openCreateModal = true} />
        <Button label="Import Project" variant="primary" onclick={() => openImportModal = true} />
      </div>
      <div class="w-80">
        <TextField placeholder="Search projects..." />
      </div>
    </section>

    <section class="flex items-center gap-6 py-20 pl-4">
       <div class="w-14 h-18 flex-shrink-0">
          <svg viewBox="0 0 80 80" class="w-full h-full stroke-gray-900 fill-none stroke-[3.5] stroke-round">
            <path d="M12 14h32v14H28l16 0v14H28v24L12 50h16V28H12z"></path>
          </svg>
       </div> 
       <div>
         <h2 class="text-5xl font-extrabold tracking-tight">Welcome to FuzzChain!</h2>
         <p class="text-3xl font-extrabold tracking-tight text-gray-900">Select a project to begin your assessment.</p>
       </div>
    </section>

    <Card title="Existing Projects">
      <div class="grid grid-cols-4 px-6 py-2 text-xs font-bold text-gray-400 uppercase">
        <div>Name</div>
        <div>Date Created</div>
        <div>Last Modified</div>
        <div class="text-right">Actions</div>
      </div>

      {#each projects as project}
        <CardRow>
          <div class="grid grid-cols-4 w-full items-center">
            <div class="font-semibold">{project.name}</div>
            <div class="text-gray-500">{project.created}</div>
            <div class="text-gray-500">{project.modified}</div>
            <div class="flex justify-end gap-3">
              <Button label="Open" size="sm" variant="tertiary" onclick={() => goto(`/project/${project.id}`)} />
              <Button label="Export" size="sm" variant="tertiary" onclick={() => openExportPopup(project.name)} />
              <Button label="Delete" size="sm" variant="tertiary" />
            </div>
          </div>
        </CardRow>
      {/each}
    </Card>
  </main>
</div>

<CreateProjectModal open={openCreateModal} onClose={() => openCreateModal = false} />
<ImportProjectModal open={openImportModal} onClose={() => openImportModal = false} />
<ExportProjectModal open={openExportModal} projectName={selectedProjectName} onClose={() => { openExportModal = false; selectedProjectName = ''; }} />
