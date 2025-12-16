<script>
  import { quizStore } from "../store/store.svelte.js";
  import Subject from "../components/Subject.svelte";
  import Title from "../components/Title.svelte";
  import SecondaryText from "../components/SecondaryText.svelte";
  import Switch from "../components/Switch.svelte";
</script>

<Switch />
<Title text="Welcome to the" boldText="Frontend Quiz!" />
<SecondaryText>Pick a subject to get started.</SecondaryText>
{#each quizStore?.quizzes as { title, icon }, i (i)}
  <Subject href={`/quiz/${title.toLowerCase()}/1`} text={title} {icon} />
{/each}
