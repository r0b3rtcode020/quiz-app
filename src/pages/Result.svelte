<script>
  import { quizStore, resetProgress, getRedirectRoute } from "../store/store.svelte.js";
  import { navigate } from "svelte5-router";
  import Button from "../components/Button.svelte";
  import Title from "../components/Title.svelte";
  import ScoreCard from "../components/ScoreCard.svelte";

  $effect(() => {
    if (!quizStore.isQuizCompleted) {
      navigate(getRedirectRoute(), { replace: true });
    }
  });

  const handlePlayAgain = () => {
    resetProgress();
    navigate("/", { replace: true });
  };
</script>

<section>
  <div class="heading">
    <Title text="Quiz completed" boldText="You scored..." />
  </div>
  <div class="result">
    <ScoreCard
      score={quizStore?.score}
      totalQuestions={quizStore?.totalQuestions}
      subject={quizStore?.currentSubject}
      icon={quizStore?.currentIcon}
    />
    <Button label="Play again" onClick={handlePlayAgain} />
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: clamp(var(--sp-40), calc(0.55rem + 8.27vw), var(--sp-128));

    @media (width >= 80rem) {
      flex-direction: row;
    }
  }

  .heading {
    flex: 1;
  }

  .result {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: clamp(var(--sp-16), 4.25vw, var(--sp-32));
  }
</style>
