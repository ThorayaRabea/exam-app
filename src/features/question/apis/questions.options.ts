import { getQuestionsAPI } from "./questions.apis";
import { QUESTION_KEY } from "./questions.keys";
export const questionsQueryOptions = (examId: string) => ({
  queryKey: QUESTION_KEY.list([examId]),
  queryFn: () => getQuestionsAPI(examId),
  enabled: !!examId,
});
