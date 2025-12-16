<script>
  import { quizStore } from "../store/store.svelte.js";
  import { navigate } from "svelte5-router";
  import Button from "../components/Button.svelte";
  import Title from "../components/Title.svelte";
  import ScoreCard from "../components/ScoreCard.svelte";
  import Switch from "../components/Switch.svelte";
  import SubjectSelected from "../components/SubjectSelected.svelte";

  const handlePlayAgain = () => navigate("/", { replace: true });
</script>

<SubjectSelected />
<Switch />
<Title text="Quiz completed" boldText="You scored..." />
<ScoreCard score={quizStore?.score} totalQuestions={quizStore?.totalQuestions} />
<Button label="Play again" onClick={handlePlayAgain} />
