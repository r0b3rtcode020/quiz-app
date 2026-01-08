class QuizStore {
  quizzes = $state([]);
  score = $state(0);
  totalQuestions = $state(0);
  currentSubject = $state(null);
  currentIcon = $state(null);
  currentQuestionIndex = $state(1);
  isQuizActive = $state(false);
  isQuizCompleted = $state(false);
  isLoading = $state(false);
  errorMessage = $state(null);

  redirectRoute = $derived(
    this.isQuizActive && this.currentSubject
      ? `/quiz/${this.currentSubject}/${this.currentQuestionIndex}`
      : "/"
  );

  constructor() {
    this.loadQuizzes();
  }

  async loadQuizzes() {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      const res = await fetch("/data/data.json");
      if (!res.ok) throw new Error("No se pudo cargar la información de los quizzes");

      const data = await res.json();
      this.quizzes = data.quizzes;
    } catch (error) {
      this.errorMessage = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  resetScore = () => (this.score = 0);
  incrementScore = () => this.score++;
  setTotalQuestions = total => (this.totalQuestions = total);

  resetProgress = () => {
    this.currentSubject = null;
    this.currentIcon = null;
    this.currentQuestionIndex = 1;
    this.isQuizActive = false;
    this.isQuizCompleted = false;
    this.resetScore();
    this.setTotalQuestions(0);
  };

  startQuiz = (subject, totalQuestions, icon) => {
    this.resetProgress();
    this.currentSubject = subject;
    this.currentIcon = icon;
    this.isQuizActive = true;
    this.isQuizCompleted = false;
    this.currentQuestionIndex = 1;
    this.setTotalQuestions(totalQuestions);
  };

  advanceQuestion = () => {
    this.currentQuestionIndex += 1;
  };

  completeQuiz = () => {
    this.isQuizActive = false;
    this.isQuizCompleted = true;
  };
}

export const quizStore = new QuizStore();
