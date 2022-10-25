<script>
  import { onMount } from 'svelte';
  import DeepTest from './DeepTest.svelte';
  let num;
  onMount(() => {
    num = Math.trunc(Math.random() * (100) + 1);
  });
</script>


<div>
  <h2>
    This is a test
  </h2>
  <p>Here's a random number: {num}</p>
  <DeepTest num={num}/>
</div>


<style>
  * {
    background-color: purple;
  }
</style>