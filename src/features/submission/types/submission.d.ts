export interface IExamSummary {
  id: string;
  title: string;
  duration: number;
}

export interface ISubmission {
  id: string;
  userId: string;
  examId: string;
  examTitle: string | null;
  exam: IExamSummary | null;
  score: number | null;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubmissionAnswerInput {
  questionId: string;
  answerId: string;
}

export interface ISubmitExamPayload {
  examId: string;
  answers: ISubmissionAnswerInput[];
  startedAt: string;
}

export interface IAnalyticsAnswer {
  id?: string;
  text?: string;
}

export interface ISubmissionAnalyticsItem {
  questionId: string;
  questionText: string;
  selectedAnswer: IAnalyticsAnswer|null;
  isCorrect: boolean;
  correctAnswer: IAnalyticsAnswer;
}

export interface ISubmissionResult {
  submission: ISubmission;
  analytics: ISubmissionAnalyticsItem[];
}