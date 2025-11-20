<script>
  import { Router, Route } from "svelte5-router";
  import QuizSelection from "./pages/QuizSelection.svelte";
  import Quiz from "./pages/Quiz.svelte";
  import Result from "./pages/Result.svelte";
</script>

<Router>
  <Route path="/" component={QuizSelection} />
  <Route path="/quiz" component={Quiz} />
  <Route path="/result" component={Result} />
</Router>
