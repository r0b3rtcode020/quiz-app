<script>
  import { navigate } from "svelte5-router";
  import {
    quizStore,
    incrementScore,
    advanceQuestion,
    completeQuiz,
    getRedirectRoute,
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

  let requestedIndex = $derived(Number(questionIndex));
  let quiz = $derived(quizStore.quizzes.find(q => q.title.toLowerCase() === subject));
  let currentQuestion = $derived(quiz?.questions[requestedIndex - 1]);

  let selectedAnswer = $state(null);
  let showFeedback = $state(false);
  let errorMessage = $state(false);

  // Validaciones como $derived (solo para cálculos)
  let isInvalidQuiz = $derived(
    !quizStore.isQuizActive ||
      !quizStore.currentSubject ||
      subject !== quizStore.currentSubject ||
      !Number.isFinite(requestedIndex) ||
      requestedIndex !== quizStore.currentQuestionIndex
  );

  // Efecto que maneja las redirecciones
  $effect(() => {
    if (quizStore.isQuizCompleted) {
      navigate("/result", { replace: true });
      return;
    }

    if (isInvalidQuiz) {
      navigate(getRedirectRoute(), { replace: true });
    }
  });

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

    const isLastQuestion = quizStore.currentQuestionIndex >= (quiz?.questions?.length || 0);

    if (isLastQuestion) {
      completeQuiz();
      navigate("/result", { replace: true });
      return;
    }

    selectedAnswer = null;
    showFeedback = false;
    errorMessage = false;

    advanceQuestion();
    navigate(`/quiz/${subject}/${quizStore.currentQuestionIndex}`, { replace: true });
  };
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
