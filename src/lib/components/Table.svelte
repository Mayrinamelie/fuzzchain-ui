<script>
  // Props to receive from parent
  export let columns = []; // Array of column headers
  export let rows = [];    // Array of objects representing rows
</script>

<div class="table-container">
  <table>
    <thead>
      <tr>
        {#each columns as col}
          <th>{col}</th>
        {/each}
      </tr>
    </thead>

    <tbody>
      {#each rows as row}
        <tr>
          {#each columns as col}
            <td>{row[col]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-container {
    width: 100%;
    overflow-x: auto;
    margin-top: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }
</style>