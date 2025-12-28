<script>
  let { question } = $props();
</script>

<h1>{question}</h1>

<style>
  h1 {
    font-size: clamp(var(--fs-20), 5vw, var(--fs-36));
    line-height: var(--lh-120);
  }
</style>
