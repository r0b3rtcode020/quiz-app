<script>
  let { current, total } = $props();
</script>

<progress value={current} max={total}></progress>

<style>
  progress {
    width: 100%;
    height: var(--sp-16);
    border-radius: 63rem;
    appearance: none;
    -webkit-appearance: none;
  }

  progress::-webkit-progress-bar {
    background-color: var(--subject-bg);
    padding: var(--sp-4);
    border-radius: 63rem;
  }

  progress::-webkit-progress-value {
    background-color: var(--clr-purple-600);
    border-radius: 63rem;
  }

  progress::-moz-progress-bar {
    background-color: var(--clr-purple-600);
    border-radius: 63rem;
  }
</style>
