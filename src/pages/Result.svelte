<script>
  import { quizStore } from "../store/store.svelte.js";
  import { navigate } from "svelte5-router";

  const handlePlayAgain = () => navigate("/", { replace: true });
</script>

<h1>Quiz completed <span>You scored...</span></h1>

<div>
  <div>Subject</div>
  <p>{quizStore.score}</p>
  <p>out of {quizStore.totalQuestions}</p>
</div>

<button type="button" onclick={handlePlayAgain}>Play Again</button>
