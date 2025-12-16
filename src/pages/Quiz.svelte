<script>
  import { navigate } from "svelte5-router";
  import {
    quizStore,
    resetScore,
    incrementScore,
    setTotalQuestions,
  } from "../store/store.svelte.js";
  import OptionsList from "../components/OptionsList.svelte";
  import Button from "../components/Button.svelte";
  import ErrorMessage from "../components/ErrorMessage.svelte";
  import Question from "../components/Question.svelte";
  import SecondaryText from "../components/SecondaryText.svelte";
  import Switch from "../components/Switch.svelte";
  import SubjectSelected from "../components/SubjectSelected.svelte";
  import ProgressBar from "../components/ProgressBar.svelte";

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

    if (answer === currentQuestion?.answer) {
      incrementScore();
    }
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

      if (Number(questionIndex) === 1) {
        resetScore();
        setTotalQuestions(quiz?.questions?.length || 0);
      }
    }
  });
</script>

<SubjectSelected />
<Switch />
<SecondaryText>Question {questionIndex} of {quizStore?.totalQuestions}</SecondaryText>
<Question question={currentQuestion?.question} />
<ProgressBar />
<OptionsList
  options={currentQuestion?.options || []}
  {selectedAnswer}
  correctAnswer={currentQuestion?.answer || ""}
  {showFeedback}
  onAnswerSelect={handleAnswer}
/>
<Button label="Submit answer" onClick={handleNavigation} />
{#if errorMessage}
  <ErrorMessage message="Please select an answer" />
{/if}
