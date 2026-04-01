<script>
  import ModalForm from '$lib/components/ModalForm.svelte';
  import TextField from '$lib/components/TextField.svelte';
  import ModalActions from '$lib/components/ModalActions.svelte';

  let { open = false, onClose = () => {} } = $props();

  let projectName = $state("");
  let startDate = $state("");
  let endDate = $state("");
  let analystInitials = $state("");

  function handleCreate() {
    console.log({
      projectName,
      startDate,
      endDate,
      analystInitials
    });

    onClose();
  }
</script>

<ModalForm {open} title="Create Project" onClose={onClose}>
  <TextField label="Project Name" placeholder="Project Name" bind:value={projectName} />
  <TextField label="Start Date" placeholder="mm/dd/yyyy" bind:value={startDate} />
  <TextField label="End Date" placeholder="mm/dd/yyyy" bind:value={endDate} />
  <TextField label="Analyst's Initials" placeholder="Initials" bind:value={analystInitials} />

  <ModalActions
    primaryLabel="Create"
    secondaryLabel="Cancel"
    onPrimary={handleCreate}
    onSecondary={onClose}
  />
</ModalForm>