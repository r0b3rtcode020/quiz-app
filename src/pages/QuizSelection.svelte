<script>
  import { navigate } from "svelte5-router";
  import { quizStore } from "../store/store.svelte.js";
  import Subject from "../components/Subject.svelte";
  import Title from "../components/Title.svelte";
  import SecondaryText from "../components/SecondaryText.svelte";

  $effect(() => {
    quizStore.resetProgress();
  });

  const handleStart = (title, icon) => {
    const subject = title.toLowerCase();
    const quiz = quizStore.quizzes.find(q => q.title.toLowerCase() === subject);
    const total = quiz?.questions?.length || 0;

    quizStore.startQuiz(subject, total, icon);
    navigate(`/quiz/${subject}/1`);
  };
</script>

<section>
  <div class="heading">
    <Title text="Welcome to the" boldText="Frontend Quiz!" />
    <SecondaryText>Pick a subject to get started.</SecondaryText>
  </div>

  <div class="subjects">
    {#each quizStore?.quizzes as { title, icon }, i (i)}
      <Subject {title} {icon} onClick={() => handleStart(title, icon)} />
    {/each}
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
    display: flex;
    flex-direction: column;
    gap: var(--sp-16);

    @media (width >= 80rem) {
      gap: var(--sp-48);
    }
  }

  .subjects {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--sp-16);

    @media (48rem <= width < 80rem) {
      gap: var(--sp-24);
    }
  }
</style>
