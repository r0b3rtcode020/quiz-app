<script>
  let { children } = $props();
</script>

<p>{@render children()}</p>

<style>
  p {
    font-size: clamp(var(--fs-14), 3.5vw, var(--fs-20));
    font-weight: var(--fw-regular);
    font-style: var(--style-italic);
    line-height: var(--lh-150);
    color: var(--clr-tagline);
  }
</style>
