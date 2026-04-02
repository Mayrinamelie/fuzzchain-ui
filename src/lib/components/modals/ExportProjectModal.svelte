<script>
  import ModalForm from '$lib/components/ModalForm.svelte';
  import ModalActions from '$lib/components/ModalActions.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import Button from '$lib/components/Button.svelte';

  let { open = false, onClose = () => {}, project = { name: 'Project', id: '' } } = $props();

  let fileName = $state('');
  let saveTo   = $state('Downloads');

  async function chooseSaveLocation() {
    try {
      const dir = await window.showDirectoryPicker();
      saveTo = dir.name;
    } catch { /* user cancelled */ }
  }

  function handleExport() {
    console.log('Exporting:', { fileName, saveTo });
    onClose();
  }

  function handleClose() {
    fileName = ''; saveTo = 'Downloads';
    onClose();
  }
</script>

<ModalForm {open} title="Export Project" onClose={handleClose}>
  <div class="space-y-5 py-4">
    <div>
      <p class="font-semibold text-gray-900">{project.name}</p>
      {#if project.id}<p class="text-xs text-gray-400">ID: {project.id}</p>{/if}
    </div>

    <TextField label="File Name" placeholder="File Name" bind:value={fileName} />

    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700">Save To</label>
      <div class="flex gap-2">
        <input
          type="text"
          bind:value={saveTo}
          placeholder="Downloads"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <Button label="Choose" onclick={chooseSaveLocation} />
      </div>
    </div>
  </div>

  <ModalActions
    primaryLabel="Export"
    onPrimary={handleExport}
    onSecondary={handleClose}
    primaryDisabled={!fileName.trim()}
  />
</ModalForm>