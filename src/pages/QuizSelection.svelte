<script>
  import { navigate } from "svelte5-router";
  import { quizStore, resetProgress, startQuiz } from "../store/store.svelte.js";
  import Subject from "../components/Subject.svelte";
  import Title from "../components/Title.svelte";
  import SecondaryText from "../components/SecondaryText.svelte";
  import Switch from "../components/Switch.svelte";

  $effect(() => {
    resetProgress();
  });

  const handleStart = title => {
    const subject = title.toLowerCase();
    const quiz = quizStore.quizzes.find(q => q.title.toLowerCase() === subject);
    const total = quiz?.questions?.length || 0;

    startQuiz(subject, total);
    navigate(`/quiz/${subject}/1`);
  };
</script>

<Switch />
<Title text="Welcome to the" boldText="Frontend Quiz!" />
<SecondaryText>Pick a subject to get started.</SecondaryText>

{#each quizStore?.quizzes as { title, icon }, i (i)}
  <Subject {title} {icon} onClick={() => handleStart(title)} />
{/each}
