export let quizStore = $state({
  quizzes: [],
  score: 0,
  totalQuestions: 0,
});

export const resetScore = () => (quizStore.score = 0);

export const incrementScore = () => quizStore.score++;

export const setTotalQuestions = total => (quizStore.totalQuestions = total);

const loadQuizzes = async () => {
  const res = await fetch("/data/data.json");
  const data = await res.json();
  quizStore.quizzes = data.quizzes;
};

loadQuizzes();
