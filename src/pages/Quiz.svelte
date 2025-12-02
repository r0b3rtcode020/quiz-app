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

    const normalizedOption = normalizeText(option);
    const normalizedSelected = normalizeText(selectedAnswer);
    const normalizedCorrect = normalizeText(currentAnswer);

    if (normalizedOption === normalizedSelected && normalizedOption === normalizedCorrect) {
      return "correct";
    } else if (normalizedOption === normalizedSelected && normalizedOption !== normalizedCorrect) {
      return "incorrect";
    }
    return "";
  };

  const showIcon = option => {
    if (!showFeedback) return false;

    const normalizedOption = normalizeText(option);
    const normalizedSelected = normalizeText(selectedAnswer);
    const normalizedCorrect = normalizeText(currentAnswer);

    return normalizedOption === normalizedCorrect || normalizedOption === normalizedSelected;
  };

  const getIcon = option => {
    const normalizedOption = normalizeText(option);
    const normalizedCorrect = normalizeText(currentAnswer);

    return normalizedOption === normalizedCorrect ? IconCorrect : IconIncorrect;
  };

  const handleNavigation = () => {
    if (!selectedAnswer) {
      errorMessage = true;
      return;
    }
    if (Number(questionIndex) < quiz?.questions?.length) {
      navigate(`/quiz/${subject}/${Number(questionIndex) + 1}`, { replace: true });
    } else {
      navigate("/result", { replace: true });
    }
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
        {#if showIcon(options)}
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
