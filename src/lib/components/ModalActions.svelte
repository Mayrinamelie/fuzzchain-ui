<script>
  import Button from "$lib/components/Button.svelte";

  let {
    primaryLabel = "Submit",
    secondaryLabel = "Cancel",
    onPrimary = () => {},
    onSecondary = () => {},
    primaryDisabled = false
  } = $props();
</script>

<div class="mt-8 flex gap-4">
  <Button
    label={primaryLabel}
    variant="primary"
    onclick={onPrimary}
    class="w-40"
  />

  <Button
    label={secondaryLabel}
    variant="secondary"
    onclick={onSecondary}
    class="w-40"
  />
</div>