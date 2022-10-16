<script lang="ts">
	import { EntryTypes } from "../enums/entryType";
	import type { IEntry } from "../types/entry";
  import Panel from "../components/Panel.svelte";

  export let data: {
    balance:number,
    entries: Array<IEntry>,
    incomingTotal:number,
    outgoingTotal:number,
    filters: {
			description: string,
			type: string
		}
  };
  
</script>

<main>
  <div class="panels">
    <Panel color="blue" label="Balance" value={data.balance} />
    <Panel color="green" label="Total incoming" value={data.incomingTotal} />
    <Panel color="red" label="Total outgoing" value={data.outgoingTotal} />
  </div>
  <div class="add-panel">
    <form method="post" action="?/add">
      <input name="description"
        type="text"
        placeholder="Description"
      />
      <input name="value" type="number" placeholder="Value"  />
      <select name="type">
        <option value="">--- Select type ---</option>
        <option value="0">Incoming</option>
        <option value="1">Outgoing</option>
      </select>
      <button class="add-button" type="submit">Add</button>
    </form>
  </div>
  <div class="data-panel">
    <div class="filters">
      <form method="get">
        <span>Filters</span>
        <input
          name="description"
          type="text"
          placeholder="Description" value={data.filters.description}
        />
        <select name="type" value={data.filters.type}>
          <option value="">All types</option>
          <option value="0">Incoming</option>
          <option value="1">Outgoing</option>
        </select>
        <button type="submit">Apply filters</button>
      </form>
    </div>
    <table>
      <tr>
        <th />
        <th align="left">Description</th>
        <th align="left">Value ($)</th>
        <th />
      </tr>
      {#each data.entries as entry, index}
        <tr class="table-row">
          <td>
            {#if entry.type === EntryTypes.incoming}
              <box-icon type="solid" name="up-arrow-circle" color="#00a75a" />
            {:else}
              <box-icon type="solid" name="down-arrow-circle" color="#dd4c39" />
            {/if}
          </td>
          <td>{entry.description}</td>
          <td>{entry.value}</td>
          <td>
            <form method="post" action="?/remove">
              <input type="hidden" name="index" value={index}>
              <button type="submit">
                <box-icon name="trash-alt" color="#dd4c39" />
              </button>
            </form>
          </td>
        </tr>
      {/each}
    </table>
  </div>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    padding: 50px;
  }

  .panels {
    width: 100%;
    max-width: 800px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 40px;
  }

  .add-panel {
    width: 100%;
    max-width: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: whitesmoke;
    border-radius: 4px;
    padding: 10px;
  }

  input,
  select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    background-color: whitesmoke;
  }

  .add-panel .add-button {
    padding: 5px 20px;
    background-color: #00a75a;
    cursor: pointer;
    color: white;
    border-radius: 4px;
    border: none;
  }

  .data-panel {
    width: 100%;
    max-width: 800px;
    background-color: whitesmoke;
    border-radius: 4px;
    padding: 10px;
  }

  .data-panel .filters {
    padding-bottom: 20px;
  }

  .data-panel .filters *:nth-child(2) {
    margin-left: 10px;
  }

  .data-panel .filters button {
    padding: 5px 20px;
    background-color: #00a75a;
    cursor: pointer;
    color: white;
    border-radius: 4px;
    border: none;
  }

  table {
    width: 100%;
    max-width: 800px;
    border-radius: 4px;
    border-collapse: collapse;
  }

  td {
    border-top: 1px solid #d2d2d2;
  }

  table th:nth-child(1) {
    width: 1%;
    white-space: nowrap;
  }

  table th:nth-child(4) {
    width: 1%;
    white-space: nowrap;
  }

  th,
  td {
    padding: 5px 10px;
  }

  table .table-row button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
</style>
