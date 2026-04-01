<script>
  import ModalForm from '$lib/components/ModalForm.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import ModalActions from '$lib/components/ModalActions.svelte';

  let { open = false, onClose = () => {} } = $props();

  let filePath = $state("");

  function handleCreate() {
    console.log({
      filePath
    });

    onClose();
  }
</script>

<ModalForm {open} title="Import Project" onClose={onClose}>
  <TextField label="File Path" placeholder="File Path" bind:value={filePath} />

  <ModalActions
    primaryLabel="Import"
    secondaryLabel="Cancel"
    onPrimary={handleCreate}
    onSecondary={onClose}
  />
</ModalForm>