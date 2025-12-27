<script>
  import Option from "./Option.svelte";

  let { options, selectedAnswer, correctAnswer, showFeedback, onAnswerSelect } = $props();

  const normalizeText = text => text.toLowerCase().trim();
  const isSelected = option => normalizeText(option) === normalizeText(selectedAnswer);
  const isCorrect = option => normalizeText(option) === normalizeText(correctAnswer);
</script>

<ul>
  {#each options as option, i (i)}
    <li>
      <Option
        index={i}
        {option}
        isSelected={isSelected(option)}
        isCorrect={isCorrect(option)}
        {showFeedback}
        disabled={showFeedback}
        onSelect={onAnswerSelect}
      />
    </li>
  {/each}
</ul>
