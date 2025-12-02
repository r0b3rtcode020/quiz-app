<script>
  import { quizStore } from "../store/store.svelte.js";
  import Subject from "../components/Subject.svelte";
</script>

<h1>Welcome to the <span>Frontend Quiz!</span></h1>
<p>Pick a subject to get started.</p>

{#each quizStore.quizzes as { title, icon }, i (i)}
  <Subject href={`/quiz/${title.toLowerCase()}/1`} text={title} {icon} />
{/each}
