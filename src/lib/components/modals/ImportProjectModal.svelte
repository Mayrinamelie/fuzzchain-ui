<script>
  import ModalForm from '$lib/components/ModalForm.svelte';
  import ModalActions from '$lib/components/ModalActions.svelte';
  import Button from '$lib/components/Button.svelte';

  let { open = false, onClose = () => {} } = $props();

  let activeTab = $state('upload');
  let importFile = $state(null);
  let filePath = $state('');
  let fileInput = $state(null);
  let fileName = $state('');

  function handleFileInput(e) {
    const file = e.target.files[0];
    if (file) { importFile = file; fileName = file.name; }
  }

  function handlePathSubmit() {
    if (filePath.trim()) {
      importFile = { type: 'path', path: filePath };
      fileName = filePath.split('/').pop();
    }
  }

  function handleImport() {
    console.log('Importing project:', importFile);
    onClose();
  }

  function handleClose() {
    importFile = null; fileName = ''; filePath = '';
    onClose();
  }
</script>

<ModalForm {open} title="Import Project" onClose={handleClose}>
  <div class="space-y-4 py-4">

    <!-- tabs — no Paste since you can't paste a .zip -->
    <div class="flex gap-2 border-b border-gray-200">
      <button
        class="px-4 py-2 text-sm font-medium transition-colors
          {activeTab === 'upload' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}"
        onclick={() => activeTab = 'upload'}>
        Upload/Drop
      </button>
      <button
        class="px-4 py-2 text-sm font-medium transition-colors
          {activeTab === 'path' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}"
        onclick={() => activeTab = 'path'}>
        File Path
      </button>
    </div>

    {#if activeTab === 'upload'}
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input bind:this={fileInput} type="file" accept=".zip" class="hidden" onchange={handleFileInput} />
        {#if fileName}
          <p class="text-sm font-medium text-gray-900">✓ {fileName}</p>
        {:else}
          <p class="text-gray-500 mb-3">Drag and drop your .zip file here</p>
          <Button label="Browse Files" onclick={() => fileInput.click()} />
        {/if}
      </div>
    {/if}

    {#if activeTab === 'path'}
      <div class="space-y-3">
        <label class="block text-sm font-medium text-gray-700">File Path</label>
        <input
          type="text"
          bind:value={filePath}
          placeholder="/path/to/project.zip"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
        />
        <Button label="Use File Path" onclick={handlePathSubmit} />
      </div>
    {/if}

    {#if fileName}
      <p class="text-sm text-green-600 font-medium">✓ Ready to import: {fileName}</p>
    {/if}

  </div>

  <ModalActions
    primaryLabel="Import"
    onPrimary={handleImport}
    onSecondary={handleClose}
    primaryDisabled={!importFile}
  />
</ModalForm>
