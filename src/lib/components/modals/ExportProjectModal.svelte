<script>
  import ModalForm from '$lib/components/ModalForm.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import ModalActions from '$lib/components/ModalActions.svelte';

  let { open = false, onClose = () => {} } = $props();

  let fileName = $state("");
  let format = $state("");
  let saveTo = $state("");

  function handleCreate() {
    console.log({
      fileName,
      format,
      saveTo,
    });

    onClose();
  }
</script>

<ModalForm {open} title="Export Project" onClose={onClose}>
  <TextField label="File Name" placeholder="File Name" bind:value={fileName} />
  <TextField label="Format" placeholder="Archive (.zip) (default)" bind:value={format} />
  <TextField label="Save To" placeholder="Downloads" bind:value={saveTo} />

  <ModalActions
    primaryLabel="Export"
    secondaryLabel="Cancel"
    onPrimary={handleCreate}
    onSecondary={onClose}
  />
</ModalForm>