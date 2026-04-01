<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import CreateProjectModal from '$lib/components/modals/CreateProjectModal.svelte';
  import ImportProjectModal from '$lib/components/modals/ImportProjectModal.svelte';
  import ExportProjectModal from '$lib/components/modals/ExportProjectModal.svelte';
  import { goto } from '$app/navigation';

  let openCreateModal = $state(false);
  let openImportModal = $state(false);
  let openExportModal = $state(false);
  let selectedProjectName = $state('');

  let projects = [
    { name: 'Project Name', created: 'mm/dd/yyyy', modified: 'mm/dd/yyyy' },
    { name: 'Project Name', created: 'mm/dd/yyyy', modified: 'mm/dd/yyyy' },
    { name: 'Project Name', created: 'mm/dd/yyyy', modified: 'mm/dd/yyyy' },
    { name: 'Project Name', created: 'mm/dd/yyyy', modified: 'mm/dd/yyyy' },
    { name: 'Project Name', created: 'mm/dd/yyyy', modified: 'mm/dd/yyyy' },
    { name: 'Project Name', created: 'mm/dd/yyyy', modified: 'mm/dd/yyyy' },
    { name: 'Project Name', created: 'mm/dd/yyyy', modified: 'mm/dd/yyyy' }
  ];

  function openExportPopup(projectName) {
    selectedProjectName = projectName;
    openExportModal = true;
  }
</script>

<div class="page-shell">
  <Sidebar activePage="home" />

  <main class="dashboard-page">
    <header class="page-header">
      <h1>Fuzzchain Dashboard</h1>
    </header>

    <section class="toolbar-row">
      <div class="left-actions">
        <button class="action-btn" type="button" onclick={() => { openCreateModal = true; }}>
          Create Project
        </button>

	<button class="action-btn" type="button" onclick={() => { openImportModal = true; }}>
          Import Project
        </button>

	<button class="action=btn" type="button" onclick={() => goto('/fuzzing') }>
	  Dev Tools: Fuzzing
	</button>
	
      </div>


      <label class="search-wrap" aria-label="Search projects">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="M20 20l-4.35-4.35"></path>
        </svg>
        <input type="text" placeholder="Search..." />
      </label>
    </section>

    <section class="hero-row">
      <div class="hero-icon" aria-hidden="true">
        <svg viewBox="0 0 80 80">
          <path d="M12 14h32v14H28l16 0v14H28v24L12 50h16V28H12z"></path>
        </svg>
      </div>

      <div class="hero-copy">
        <h2>Welcome to FuzzChain!</h2>
        <p>Select a project to begin your assessment.</p>
      </div>
    </section>

    <section class="projects-card">
      <h3>Existing Projects</h3>

      <div class="projects-table">
        <div class="table-head table-grid">
          <div>Name</div>
          <div>Date Created</div>
          <div>Last Day Modified</div>
          <div></div>
        </div>

        {#each projects as project}
          <div class="table-row table-grid">
            <div class="cell name-cell">{project.name}</div>
            <div class="cell">{project.created}</div>
            <div class="cell">{project.modified}</div>
            <div class="row-actions">
              <button class="mini-btn" type="button">Open</button>
              <button class="mini-btn" type="button" onclick={() => openExportPopup(project.name)}>
                Export
              </button>
              <button class="mini-btn" type="button">Delete</button>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </main>
</div>

<CreateProjectModal
  open={openCreateModal}
  onClose={() => { openCreateModal = false; }}
/>

<ImportProjectModal
  open={openImportModal}
  onClose={() => { openImportModal = false; }}
/>

<ExportProjectModal
  open={openExportModal}
  projectName={selectedProjectName}
  onClose={() => {
    openExportModal = false;
    selectedProjectName = '';
  }}
/>

<style>
  :global(body) {
    margin: 0;
    background: #f5f5f5;
    color: #111111;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .page-shell {
    display: flex;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .dashboard-page {
    flex: 1;
    min-width: 0;
    padding: 0 32px 32px;
  }

  .page-header {
    margin: 0 -32px;
    padding: 20px 32px;
    border-bottom: 1px solid #d7d7d7;
    background: #f5f5f5;
  }

  .page-header h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
  }

  .toolbar-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 26px 0 10px;
  }

  .left-actions {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .action-btn,
  .mini-btn {
    border: 0;
    border-radius: 10px;
    background: #000000;
    color: #ffffff;
    font: inherit;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .action-btn:hover,
  .mini-btn:hover {
    opacity: 0.88;
  }

  .action-btn {
    min-width: 222px;
    height: 40px;
    padding: 0 24px;
    font-size: 15px;
    font-weight: 500;
  }

  .search-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    width: min(100%, 405px);
    height: 40px;
    padding: 0 14px;
    border: 1px solid #d2d2d2;
    border-radius: 10px;
    background: #f5f5f5;
    box-sizing: border-box;
  }

  .search-wrap svg {
    width: 22px;
    height: 22px;
    stroke: #8d8d8d;
    stroke-width: 2;
    fill: none;
    flex: 0 0 auto;
  }

  .search-wrap input {
    width: 100%;
    border: 0;
    outline: none;
    background: transparent;
    font: inherit;
    font-size: 15px;
    color: #111111;
  }

  .search-wrap input::placeholder {
    color: #8b8b8b;
  }

  .hero-row {
    display: flex;
    align-items: center;
    gap: 28px;
    padding: 86px 0 88px 36px;
  }

  .hero-icon {
    width: 56px;
    height: 72px;
    flex: 0 0 auto;
  }

  .hero-icon svg {
    width: 100%;
    height: 100%;
    stroke: #222222;
    stroke-width: 3.5;
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  .hero-copy h2,
  .hero-copy p {
    margin: 0;
    letter-spacing: -0.02em;
  }

  .hero-copy h2 {
    font-size: clamp(2rem, 3vw, 3.2rem);
    line-height: 1.02;
    font-weight: 800;
  }

  .hero-copy p {
    font-size: clamp(2rem, 3vw, 3.2rem);
    line-height: 1.02;
    font-weight: 800;
  }

  .projects-card {
    background: #f6f6f6;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    padding: 22px 24px 24px;
    margin: 0 0 0 8px;
  }

  .projects-card h3 {
    margin: 0 0 18px;
    font-size: 16px;
    font-weight: 700;
  }

  .projects-table {
    width: 100%;
  }

  .table-grid {
    display: grid;
    grid-template-columns: 1.1fr 1.1fr 1.25fr auto;
    align-items: center;
    gap: 16px;
  }

  .table-head {
    padding: 0 0 8px;
    color: #888888;
    font-size: 14px;
    font-weight: 700;
  }

  .table-row {
    min-height: 48px;
    border-top: 1px solid #dddddd;
  }

  .cell {
    padding: 8px 0;
    font-size: 14px;
    color: #1b1b1b;
  }

  .name-cell {
    font-weight: 500;
  }

  .row-actions {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 4px 0;
  }

  .mini-btn {
    min-width: 74px;
    height: 40px;
    padding: 0 16px;
    font-size: 15px;
    font-weight: 500;
  }

  @media (max-width: 1200px) {
    .toolbar-row {
      flex-direction: column;
      align-items: stretch;
    }

    .search-wrap {
      width: 100%;
    }

    .table-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .table-head > :last-child,
    .table-row > :last-child {
      grid-column: 1 / -1;
    }

    .row-actions {
      padding-bottom: 12px;
    }
  }

  @media (max-width: 768px) {
    .dashboard-page {
      padding: 0 18px 24px;
    }

    .page-header {
      margin: 0 -18px;
      padding: 18px;
    }

    .left-actions {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    .action-btn {
      width: 100%;
      min-width: 0;
    }

    .hero-row {
      padding: 48px 0 56px 0;
      gap: 18px;
    }

    .hero-copy h2,
    .hero-copy p {
      font-size: 1.8rem;
    }

    .projects-card {
      margin-left: 0;
      padding: 18px;
    }

    .table-grid {
      grid-template-columns: 1fr;
      gap: 4px;
    }

    .table-head {
      display: none;
    }

    .table-row {
      padding: 12px 0;
    }

    .cell {
      padding: 2px 0;
    }

    .row-actions {
      flex-wrap: wrap;
      gap: 10px;
      padding-top: 8px;
    }
  }
</style>
