<script>
  import IconCorrect from "../assets/images/icon-correct.svg";
  import IconIncorrect from "../assets/images/icon-incorrect.svg";

  let { index, option, isSelected, isCorrect, showFeedback, disabled, onSelect } = $props();

  let shouldShowIcon = $derived(showFeedback && (isCorrect || isSelected));
  let iconSrc = $derived(isCorrect ? IconCorrect : IconIncorrect);
  let iconAlt = $derived(isCorrect ? "Correct answer" : "Incorrect answer");
  let buttonClass = $derived.by(() => {
    if (!showFeedback) return "";
    if (isSelected && isCorrect) return "correct";
    if (isSelected && !isCorrect) return "incorrect";
    return "";
  });

  let symbol = $derived.by(() => {
    if (index === 0) return "A";
    if (index === 1) return "B";
    if (index === 2) return "C";
    if (index === 3) return "D";
    return "";
  });

  let symbolColor = $derived.by(() => {
    if (buttonClass === "correct") return "good-answer";
    if (buttonClass === "incorrect") return "bad-answer";
    return "";
  });

  const handleClick = () => {
    if (!disabled) {
      onSelect(option);
    }
  };
</script>

<button type="button" class={buttonClass} onclick={handleClick} {disabled}>
  <span class={symbolColor}>{symbol}</span>
  <span class="option-text">{option}</span>
  <figure>
    {#if shouldShowIcon}
      <img src={iconSrc} alt={iconAlt} />
    {/if}
  </figure>
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

  span:not(.option-text) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: clamp(var(--sp-40), 8vw, var(--sp-56));
    aspect-ratio: 1;
    padding: clamp(var(--sp-4), 1.05vw, var(--sp-8));
    border-radius: var(--sp-8);
    background-color: var(--clr-grey-50);
    color: var(--clr-grey-500);
    flex-shrink: 0;
  }

  .option-text {
    flex: 1;
    text-align: left;
  }

  figure {
    width: clamp(var(--sp-32), 6vw, var(--sp-40));
    aspect-ratio: 1;
    flex-shrink: 0;
  }

  img {
    width: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
    button:not([disabled]):hover {
      outline: 0.25rem solid var(--clr-purple-600);
      outline-offset: 0.25rem;
    }

    button:not([disabled]):hover span:not(.option-text) {
      background-color: var(--clr-purple-600);
      color: var(--clr-white);
    }
  }

  button:not([disabled]):active,
  button:not([disabled]):focus-visible {
    outline: 0.25rem solid var(--clr-purple-600);
    outline-offset: 0.25rem;
  }

  button:not([disabled]):active span:not(.option-text),
  button:not([disabled]):focus-visible span:not(.option-text) {
    background-color: var(--clr-purple-600);
    color: var(--clr-white);
  }

  button:disabled {
    cursor: default;
  }

  .correct {
    outline: 0.25rem solid var(--clr-green-500);
    outline-offset: 0.25rem;
  }

  .incorrect {
    outline: 0.25rem solid var(--clr-red-500);
    outline-offset: 0.25rem;
  }

  span.good-answer {
    background-color: var(--clr-green-500);
    color: var(--clr-white);
  }

  span.bad-answer {
    background-color: var(--clr-red-500);
    color: var(--clr-white);
  }
</style>
