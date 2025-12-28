<script>
  let { label, onClick } = $props();
</script>

<button type="button" onclick={onClick}>{label}</button>

<style>
  button {
    background-color: var(--clr-purple-600);
    color: var(--clr-white);
    padding: clamp(var(--sp-16), 4.25vw, var(--sp-32));
    border-radius: clamp(var(--sp-12), 3.15vw, var(--sp-24));
    box-shadow: var(--shadow);
    width: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover {
      background-color: hsl(from var(--clr-purple-600) h s calc(l + 20));
    }
  }

  button:active {
    background-color: hsl(from var(--clr-purple-600) h s calc(l + 20));
  }

  button:focus-visible {
    outline: 0.25rem solid var(--clr-purple-600);
    outline-offset: 0.25rem;
  }
</style>
