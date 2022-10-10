<script>
  import Test from './Test.svelte';
  $: li1 = 'Make a svelte app';
  $: li2 = 'Put it in dev mode';
</script>

<Test />
<ol>
  <li>{li1}</li>
  <li>{li2}</li>
  <li>????</li>
  <li>Profit</li>
</ol>

<style>
  * {
    background-color: aquamarine;
  }
</style>