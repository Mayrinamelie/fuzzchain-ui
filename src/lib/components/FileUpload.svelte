<script>
  let { 
    onFileSelect = (file) => {},
    acceptedTypes = "*",
    label = "Upload File"
  } = $props();

  let fileInput;
  let isDragging = $state(false);
  let fileName = $state("");
  let filePath = $state("");
  let pastedContent = $state("");
  let activeTab = $state("upload"); // upload, paste, path

  function handleDragOver(event) {
    event.preventDefault();
    isDragging = true;
  }

  function handleDragLeave(event) {
    event.preventDefault();
    isDragging = false;
  }

  function handleDrop(event) {
    event.preventDefault();
    isDragging = false;
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }

  function handleFileInput(event) {
    const files = event.target.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }

  function handleFileSelection(file) {
    fileName = file.name;
    onFileSelect(file);
  }

  function handleBrowse() {
    fileInput.click();
  }

  function handlePasteSubmit() {
    if (pastedContent.trim()) {
      // Create a blob from pasted content
      const blob = new Blob([pastedContent], { type: 'text/plain' });
      const file = new File([blob], 'pasted-content.txt', { type: 'text/plain' });
      fileName = 'pasted-content.txt';
      onFileSelect(file);
    }
  }

  function handlePathSubmit() {
    if (filePath.trim()) {
      // Signal that a file path was provided
      onFileSelect({ type: 'path', path: filePath });
      fileName = filePath.split('/').pop() || filePath.split('\\').pop() || filePath;
    }
  }

  function clearFile() {
    fileName = "";
    filePath = "";
    pastedContent = "";
    if (fileInput) fileInput.value = "";
  }
</script>

<div class="space-y-4">
  <!-- Tab Navigation -->
  <div class="flex gap-2 border-b border-gray-200">
    <button
      class="px-4 py-2 text-sm font-medium transition-colors {activeTab === 'upload' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}"
      onclick={() => activeTab = 'upload'}
    >
      Upload/Drop
    </button>
    <button
      class="px-4 py-2 text-sm font-medium transition-colors {activeTab === 'paste' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}"
      onclick={() => activeTab = 'paste'}
    >
      Paste
    </button>
    <button
      class="px-4 py-2 text-sm font-medium transition-colors {activeTab === 'path' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}"
      onclick={() => activeTab = 'path'}
    >
      File Path
    </button>
  </div>

  <!-- Upload/Drop Tab -->
  {#if activeTab === 'upload'}
    <div
      class="relative border-2 border-dashed rounded-lg p-8 text-center transition-colors {isDragging ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}"
      ondragover={handleDragOver}
      ondragleave={handleDragLeave}
      ondrop={handleDrop}
    >
      <input
        bind:this={fileInput}
        type="file"
        accept={acceptedTypes}
        onchange={handleFileInput}
        class="hidden"
      />

      {#if fileName}
        <div class="flex items-center justify-center gap-3">
          <div class="text-sm">
            <div class="font-medium text-gray-900">Selected: {fileName}</div>
          </div>
          <button
            onclick={clearFile}
            class="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
      {:else}
        <div class="space-y-2">
          <div class="text-gray-600">
            Drag and drop your file here
          </div>
          <div class="text-sm text-gray-500">or</div>
          <button
            onclick={handleBrowse}
            class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Browse Files
          </button>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Paste Tab -->
  {#if activeTab === 'paste'}
    <div class="space-y-3">
      <textarea
        bind:value={pastedContent}
        placeholder="Paste your scan results here..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none font-mono text-sm"
        rows="10"
      ></textarea>
      <button
        onclick={handlePasteSubmit}
        disabled={!pastedContent.trim()}
        class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Use Pasted Content
      </button>
    </div>
  {/if}

  <!-- File Path Tab -->
  {#if activeTab === 'path'}
    <div class="space-y-3">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          File Path
        </label>
        <input
          type="text"
          bind:value={filePath}
          placeholder="/path/to/scan/results.xml"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 font-mono text-sm"
        />
      </div>
      <button
        onclick={handlePathSubmit}
        disabled={!filePath.trim()}
        class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Use File Path
      </button>
    </div>
  {/if}

  {#if fileName}
    <div class="text-sm text-green-600 font-medium">
      ✓ Ready to ingest: {fileName}
    </div>
  {/if}
</div>