<script>
  import IconCorrect from "../assets/images/icon-correct.svg";
  import IconIncorrect from "../assets/images/icon-incorrect.svg";

  let { option, isSelected, isCorrect, showFeedback, disabled, onSelect } = $props();

  let shouldShowIcon = $derived(showFeedback && (isCorrect || isSelected));
  let iconSrc = $derived(isCorrect ? IconCorrect : IconIncorrect);
  let iconAlt = $derived(isCorrect ? "Correct answer" : "Incorrect answer");
  let buttonClass = $derived.by(() => {
    if (!showFeedback) return "";
    if (isSelected && isCorrect) return "correct";
    if (isSelected && !isCorrect) return "incorrect";
    return "";
  });

  const handleClick = () => {
    if (!disabled) {
      onSelect(option);
    }
  };
</script>

<button type="button" class={buttonClass} onclick={handleClick} {disabled}>
  {option}
  {#if shouldShowIcon}
    <img src={iconSrc} alt={iconAlt} />
  {/if}
</button>
