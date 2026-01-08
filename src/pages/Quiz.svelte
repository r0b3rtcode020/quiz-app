<script>
  import { navigate } from "svelte5-router";
  import { quizStore } from "../store/store.svelte.js";
  import OptionsList from "../components/OptionsList.svelte";
  import Button from "../components/Button.svelte";
  import ErrorMessage from "../components/ErrorMessage.svelte";
  import Question from "../components/Question.svelte";
  import SecondaryText from "../components/SecondaryText.svelte";
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
      navigate(quizStore.redirectRoute, { replace: true });
    }
  });

  const handleAnswer = answer => {
    selectedAnswer = answer;
    showFeedback = true;
    errorMessage = false;

    if (answer === currentQuestion?.answer) {
      quizStore.incrementScore();
    }
  };

  const handleNavigation = () => {
    if (!selectedAnswer) {
      errorMessage = true;
      return;
    }

    const isLastQuestion = quizStore.currentQuestionIndex >= (quiz?.questions?.length || 0);

    if (isLastQuestion) {
      quizStore.completeQuiz();
      navigate("/result", { replace: true });
      return;
    }

    selectedAnswer = null;
    showFeedback = false;
    errorMessage = false;

    quizStore.advanceQuestion();
    navigate(`/quiz/${subject}/${quizStore.currentQuestionIndex}`, { replace: true });
  };
</script>

<section>
  <header>
    <div class="heading">
      <SecondaryText>Question {questionIndex} of {quizStore?.totalQuestions}</SecondaryText>
      <Question question={currentQuestion?.question} />
    </div>
    <ProgressBar current={quizStore?.currentQuestionIndex} total={quizStore?.totalQuestions} />
  </header>

  <div class="answers">
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
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: clamp(var(--sp-40), calc(0.55rem + 8.27vw), var(--sp-128));

    @media (48rem <= width < 80rem) {
      gap: max(var(--sp-40), calc(-2rem + 9.375vw));
    }

    @media (width >= 80rem) {
      flex-direction: row;
    }
  }

  header {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: clamp(var(--sp-24), 6vw, var(--sp-184));

    @media (width >= 80rem) {
      gap: var(--sp-184);
    }
  }

  .heading {
    display: flex;
    flex-direction: column;
    gap: clamp(var(--sp-16), 3.5vw, var(--sp-24));
  }

  .answers {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: clamp(var(--sp-16), 4.25vw, var(--sp-32));
  }
</style>
