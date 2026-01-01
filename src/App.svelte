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
  <main>
    <header>
      <SubjectSelected subject={quizStore?.currentSubject} icon={quizStore?.currentIcon} />
      <Switch bind:isDark />
    </header>
    <Route path="/" component={QuizSelection} />
    <Route path="/quiz/:subject/:questionIndex" component={Quiz} />
    <Route path="/result" component={Result} />
  </main>
</Router>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: clamp(var(--sp-48), 6.25vw, var(--sp-88));
    padding-block: clamp(var(--sp-16), calc(-0.68rem + 7.1vw), var(--sp-88));
    padding-inline: clamp(var(--sp-24), calc(-1.141rem + 11.268vw), var(--sp-144));
    min-height: 100dvh;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
