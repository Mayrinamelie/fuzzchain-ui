<script>
  let {
    open = false,
    title = "Modal Title",
    width = "max-w-xl",
    onClose = () => {}
  } = $props();
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div class={`w-full ${width} rounded-2xl bg-white p-8 shadow-2xl`}>
      <div class="mb-6 flex items-start justify-between">
        <h2 class="text-3xl font-semibold text-black">{title}</h2>

        <button
          type="button"
          class="rounded-md px-2 py-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
          onclick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      <div class="space-y-5">
        <slot />
      </div>
    </div>
  </div>
{/if}