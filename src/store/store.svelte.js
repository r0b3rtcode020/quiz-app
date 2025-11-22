export let quizStore = $state({
  quizzes: [],
});

const loadQuizzes = async () => {
  const res = await fetch("/data/data.json");
  const data = await res.json();
  quizStore.quizzes = data.quizzes;
};

loadQuizzes();
