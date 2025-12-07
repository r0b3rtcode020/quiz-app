<script>
  import { navigate } from "svelte5-router";
  import { quizStore } from "../store/store.svelte.js";
  import IconCorrect from "../assets/images/icon-correct.svg";
  import IconIncorrect from "../assets/images/icon-incorrect.svg";

  let { subject, questionIndex } = $props();
  let quiz = $derived(quizStore.quizzes.find(question => question.title.toLowerCase() === subject));
  let currentQuestion = $derived(quiz?.questions[Number(questionIndex) - 1]?.question);
  let currentOptions = $derived(quiz?.questions[Number(questionIndex) - 1]?.options);
  let currentAnswer = $derived(quiz?.questions[Number(questionIndex) - 1]?.answer);

  let selectedAnswer = $state(null);
  let showFeedback = $state(false);
  let errorMessage = $state(false);

  const handleAnswer = answer => {
    selectedAnswer = answer;
    showFeedback = true;
    errorMessage = false;
  };

  const normalizeText = text => text.toLowerCase().trim();

  const getButtonClass = option => {
    if (!showFeedback) return "";

    const isSelected = normalizeText(option) === normalizeText(selectedAnswer);
    const isCorrect = normalizeText(option) === normalizeText(currentAnswer);

    if (isSelected && isCorrect) return "correct";
    if (isSelected && !isCorrect) return "incorrect";

    return "";
  };

  const shouldShowIcon = option => {
    if (!showFeedback) return false;

    const normalizedOption = normalizeText(option);
    const isCorrectAnswer = normalizedOption === normalizeText(currentAnswer);
    const isSelectedAnswer = normalizedOption === normalizeText(selectedAnswer);

    return isCorrectAnswer || isSelectedAnswer;
  };

  const getIcon = option => {
    const isCorrectAnswer = normalizeText(option) === normalizeText(currentAnswer);
    return isCorrectAnswer ? IconCorrect : IconIncorrect;
  };

  const handleNavigation = () => {
    if (!selectedAnswer) {
      errorMessage = true;
      return;
    }

    const isLastQuestion = Number(questionIndex) >= quiz?.questions?.length;
    const nextRoute = isLastQuestion ? "/result" : `/quiz/${subject}/${Number(questionIndex) + 1}`;

    navigate(nextRoute, { replace: true });
  };
</script>

<h1>{currentQuestion}</h1>

<ul>
  {#each currentOptions as options, i (i)}
    <li>
      <button
        class={getButtonClass(options)}
        onclick={() => handleAnswer(options)}
        disabled={showFeedback}
      >
        {options}
        {#if shouldShowIcon(options)}
          <img src={getIcon(options)} alt={options === currentAnswer ? "Correct" : "Incorrect"} />
        {/if}
      </button>
    </li>
  {/each}
</ul>

<button onclick={handleNavigation}>Submit answer</button>

{#if errorMessage}
  <p>Select an option!</p>
{/if}
