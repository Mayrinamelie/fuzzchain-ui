<script>
  let { open = false, onClose = () => {} } = $props();

  function handleBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }
</script>

{#if open}
  <div class="modal-backdrop" role="presentation" onclick={handleBackdropClick}>
    <div
      class="modal-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-project-title"
    >
      <div class="modal-header">
        <h2 id="import-project-title">Import Project</h2>
        <button class="close-btn" type="button" aria-label="Close import project popup" onclick={onClose}>
          ×
        </button>
      </div>

      <p>This is a placeholder popup for the Import Project flow.</p>
      <p>You can later replace this with drag-and-drop, file selection, or validation logic.</p>

      <div class="modal-actions">
        <button class="primary-btn" type="button" onclick={onClose}>Close</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(0, 0, 0, 0.45);
  }

  .modal-card {
    width: min(100%, 480px);
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
    padding: 24px;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 700;
  }

  .close-btn,
  .primary-btn {
    border: 0;
    font: inherit;
    cursor: pointer;
  }

  .close-btn {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    background: #f0f0f0;
    font-size: 1.4rem;
    line-height: 1;
  }

  p {
    margin: 0 0 10px;
    color: #2c2c2c;
    line-height: 1.5;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .primary-btn {
    min-width: 110px;
    height: 40px;
    padding: 0 18px;
    border-radius: 10px;
    background: #000000;
    color: #ffffff;
    font-weight: 600;
  }
</style>
