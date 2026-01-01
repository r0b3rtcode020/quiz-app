<script>
  let { subject, icon } = $props();

  let iconBg = $derived.by(() => {
    const colorMap = {
      html: "html",
      css: "css",
      javascript: "js",
      accessibility: "accessibility",
    };
    return colorMap[subject] || "";
  });

  let textTransform = $derived.by(() => {
    const transformMap = {
      html: "text-uppercase",
      css: "text-uppercase",
      javascript: "text-capitalize",
      accessibility: "text-capitalize",
    };
    return transformMap[subject] || "";
  });
</script>

<div>
  <figure class={iconBg}>
    <img src={icon} alt={subject} />
  </figure>
  <span class={textTransform}>{subject}</span>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: clamp(var(--sp-16), 3.5vw, var(--sp-24));
    color: var(--clr-text);
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
