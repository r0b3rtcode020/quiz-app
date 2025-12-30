<script>
  import { quizStore } from "../store/store.svelte.js";

  let iconBg = $derived.by(() => {
    const colorMap = {
      html: "html",
      css: "css",
      javascript: "js",
      accessibility: "accessibility",
    };
    return colorMap[quizStore.currentSubject] || "";
  });

  let textTransform = $derived.by(() => {
    const transformMap = {
      html: "text-uppercase",
      css: "text-uppercase",
      javascript: "text-capitalize",
      accessibility: "text-capitalize",
    };
    return transformMap[quizStore.currentSubject] || "";
  });
</script>

<div>
  <figure class={iconBg}>
    <img src={quizStore.currentIcon} alt={quizStore.currentSubject} />
  </figure>
  <span class={textTransform}>{quizStore.currentSubject}</span>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: clamp(var(--sp-16), 3.5vw, var(--sp-24));
    padding: clamp(var(--sp-8), 2.1vw, var(--sp-16));
    color: var(--clr-text);
    border-radius: clamp(var(--sp-12), 3.15vw, var(--sp-24));
    width: 100%;
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

  .text-uppercase {
    text-transform: uppercase;
  }

  .text-capitalize {
    text-transform: capitalize;
  }
</style>
