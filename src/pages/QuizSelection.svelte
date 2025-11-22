<script>
  import { link } from "svelte5-router";
  import { quizStore } from "../store/store.svelte.js";
</script>

<h1>Welcome to the <span>Frontend Quiz!</span></h1>
<p>Pick a subject to get started.</p>

{#each quizStore.quizzes as { title }, i (i)}
  <a href={`/quiz/${title.toLowerCase()}`} use:link>{title}</a>
{/each}
