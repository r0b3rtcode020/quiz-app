<script>
  let { title, icon, onClick } = $props();

  let iconBg = $derived.by(() => {
    const colorMap = {
      html: "html",
      css: "css",
      javascript: "js",
      accessibility: "accessibility",
    };
    return colorMap[title.toLowerCase()] || "default";
  });
</script>

<button type="button" onclick={onClick}>
  <figure class={iconBg}>
    <img src={icon} alt={title} />
  </figure>
  {title}
</button>

<style>
  button {
    display: flex;
    align-items: center;
    gap: clamp(var(--sp-16), 4.25vw, var(--sp-32));
    padding: clamp(var(--sp-16), 2vw, var(--sp-24));
    background-color: var(--subject-bg);
    color: var(--subject-text);
    border-radius: clamp(var(--sp-12), 3.15vw, var(--sp-24));
    width: 100%;
    box-shadow: var(--shadow);
  }

  figure {
    width: clamp(var(--sp-40), 8vw, var(--sp-56));
    aspect-ratio: 1;
    padding: clamp(var(--sp-4), 1.05vw, var(--sp-8));
    border-radius: var(--sp-8);
  }

  img {
    width: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover {
      outline: 0.25rem solid var(--clr-purple-600);
      outline-offset: 0.25rem;
    }
  }

  button:active,
  button:focus-visible {
    outline: 0.25rem solid var(--clr-purple-600);
    outline-offset: 0.25rem;
  }

  .html {
    background-color: var(--clr-orange-50);
  }

  .css {
    background-color: var(--clr-green-100);
  }

  .js {
    background-color: var(--clr-blue-50);
  }

  .accessibility {
    background-color: var(--clr-purple-100);
  }
</style>
