<script>
  import ModalForm from '$lib/components/ModalForm.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import ModalActions from '$lib/components/ModalActions.svelte';

  let { open = false, onClose = () => {} } = $props();

  let ip = $state("");
  let port = $state("");
  let protocol = $state("");
  let service = $state("");

  function handleCreate() {
    console.log({
      ip,
      port,
      protocol,
      service
    });

    onClose();
  }
</script>

<ModalForm {open} title="Manually Create Host" onClose={onClose}>
  <TextField label="IP" placeholder="IP" bind:value={ip} />
  <TextField label="Port" placeholder="Port" bind:value={port} />
  <TextField label="Protocol" placeholder="Protocol" bind:value={protocol} />
  <TextField label="Service" placeholder="Service" bind:value={service} />

  <ModalActions
    primaryLabel="Create"
    secondaryLabel="Cancel"
    onPrimary={handleCreate}
    onSecondary={onClose}
  />
</ModalForm>