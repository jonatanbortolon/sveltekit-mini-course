<script lang="ts">
  export let color: "red" | "green" | "blue";
  export let label: string;
  export let value: number;
</script>

<div class="panel {color}">
  <span>{label}:<br />{value}$</span>
</div>

<style>
  .panel {
    flex: 1;
    padding: 30px;
    box-shadow: 0px 0px 40px -20px black;
    border-radius: 4px;
  }

  .panel.green {
    background-color: #00a75a;
  }

  .panel.red {
    background-color: #dd4c39;
  }

  .panel.blue {
    background-color: #3c8dbd;
  }

  .panel span {
    color: white;
    font-weight: bold;
  }
</style>
