<script>
  import SubjectSelected from "./SubjectSelected.svelte";

  let { score, totalQuestions } = $props();
</script>

<div>
  <SubjectSelected />
  <p>{score}</p>
  <p>out of {totalQuestions}</p>
</div>
