<script>
  let { text, boldText } = $props();
</script>

<h1>
  {text} <br />
  <span>{boldText}</span>
</h1>

<style>
  h1 {
    font-size: clamp(var(--fs-40), 9vw, var(--fs-64));
    font-weight: var(--fw-light);
    line-height: var(--lh-120);
  }

  h1 span {
    font-weight: var(--fw-medium);
  }
</style>
