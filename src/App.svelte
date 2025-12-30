<script>
  import { Router, Route } from "svelte5-router";
  import { quizStore } from "./store/store.svelte";
  import QuizSelection from "./pages/QuizSelection.svelte";
  import Quiz from "./pages/Quiz.svelte";
  import Result from "./pages/Result.svelte";
  import SubjectSelected from "./components/SubjectSelected.svelte";
  import Switch from "./components/Switch.svelte";

  let isDark = $state(false);
  let theme = $derived(isDark ? "dark" : "light");

  $effect(() => document.documentElement.setAttribute("data-theme", theme));
</script>

<Router>
  <header>
    {#if quizStore?.currentSubject}
      <SubjectSelected subject={quizStore?.currentSubject} icon={quizStore?.currentIcon} />
    {/if}
    <Switch bind:isDark />
  </header>
  <main>
    <Route path="/" component={QuizSelection} />
    <Route path="/quiz/:subject/:questionIndex" component={Quiz} />
    <Route path="/result" component={Result} />
  </main>
</Router>
