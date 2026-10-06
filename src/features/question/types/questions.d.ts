export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IExam {
  id: string;
  title: string;
}

export interface IQuestion {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: IAnswer[];
  exam: IExam | null;
}

export interface IQuestionsPayload {
  questions: IQuestion[];
}

export interface IQuestionsResponse {
  status: boolean;
  code: number;
  payload: IQuestionsPayload;
}
export interface IQuestionResponseById{
  question:IQuestion
}