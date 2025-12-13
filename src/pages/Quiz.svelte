<script>
  import { navigate } from "svelte5-router";
  import { quizStore } from "../store/store.svelte.js";
  import IconError from "../assets/images/icon-error.svg";
  import OptionsList from "../components/OptionsList.svelte";

  let { subject, questionIndex } = $props();
  let quiz = $derived(quizStore.quizzes.find(question => question.title.toLowerCase() === subject));
  let currentQuestion = $derived(quiz?.questions[Number(questionIndex) - 1]);

  let selectedAnswer = $state(null);
  let showFeedback = $state(false);
  let errorMessage = $state(false);

  const handleAnswer = answer => {
    selectedAnswer = answer;
    showFeedback = true;
    errorMessage = false;
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

  $effect(() => {
    if (questionIndex) {
      selectedAnswer = null;
      showFeedback = false;
      errorMessage = false;
    }
  });
</script>

<h1>{currentQuestion?.question}</h1>

<OptionsList
  options={currentQuestion?.options || []}
  {selectedAnswer}
  correctAnswer={currentQuestion?.answer || ""}
  {showFeedback}
  onAnswerSelect={handleAnswer}
/>

<button type="button" onclick={handleNavigation}>Submit answer</button>

{#if errorMessage}
  <div>
    <img src={IconError} alt="Error message" />
    <p>Please select an answer</p>
  </div>
{/if}
