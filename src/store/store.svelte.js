export let quizStore = $state({
  quizzes: [],
  score: 0,
  totalQuestions: 0,
  currentSubject: null,
  currentQuestionIndex: 1,
  isQuizActive: false,
  isQuizCompleted: false,
});

export const resetScore = () => (quizStore.score = 0);

export const incrementScore = () => quizStore.score++;

export const setTotalQuestions = total => (quizStore.totalQuestions = total);

export const resetProgress = () => {
  quizStore.currentSubject = null;
  quizStore.currentQuestionIndex = 1;
  quizStore.isQuizActive = false;
  quizStore.isQuizCompleted = false;

  resetScore();
  setTotalQuestions(0);
};

export const startQuiz = (subject, totalQuestions) => {
  resetProgress();
  quizStore.currentSubject = subject;
  quizStore.isQuizActive = true;
  quizStore.isQuizCompleted = false;
  quizStore.currentQuestionIndex = 1;
  setTotalQuestions(totalQuestions);
};

export const advanceQuestion = () => {
  quizStore.currentQuestionIndex += 1;
};

export const completeQuiz = () => {
  quizStore.isQuizActive = false;
  quizStore.isQuizCompleted = true;
};

export const getRedirectRoute = () => {
  if (quizStore.isQuizActive && quizStore.currentSubject) {
    return `/quiz/${quizStore.currentSubject}/${quizStore.currentQuestionIndex}`;
  }
  return "/";
};

const loadQuizzes = async () => {
  const res = await fetch("/data/data.json");
  const data = await res.json();
  quizStore.quizzes = data.quizzes;
};
loadQuizzes();
