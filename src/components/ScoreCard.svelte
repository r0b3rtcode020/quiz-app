<script>
  import SubjectSelected from "./SubjectSelected.svelte";

  let { score, totalQuestions } = $props();
</script>

<div class="score-container">
  <SubjectSelected />
  <div class="score-content">
    <p class="score">{score}</p>
    <p class="total">out of {totalQuestions}</p>
  </div>
</div>

<style>
  .score-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(var(--sp-16), calc(-8px + 6.25vw), var(--sp-40));
    padding: clamp(var(--sp-32), 7vw, var(--sp-48));
    background-color: var(--subject-bg);
    border-radius: clamp(var(--sp-12), 3.15vw, var(--sp-24));
    box-shadow: var(--shadow);
  }

  .score-content {
    display: flex;
    flex-direction: column;
    gap: var(--sp-16);
  }

  .score {
    font-size: clamp(var(--fs-88), 19vw, var(--fs-144));
    text-align: center;
  }

  .total {
    font-size: clamp(var(--fs-18), 4vw, var(--fs-24));
    color: var(--clr-tagline);
    text-align: center;
  }
</style>
