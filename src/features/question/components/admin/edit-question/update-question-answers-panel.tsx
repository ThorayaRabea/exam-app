import { Button } from "@/components/ui/button/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { IUpdateQuestionFormValues } from "@/features/question/types/update-question";
import { Check, CheckCheck, PlusIcon, Trash2Icon, XIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export default function UpdateQuestionAnswersPanel() {
  //States
  const [showAnswer, setShowAnswer] = useState(false);
  const [newAnswerText, setNewAnswerText] = useState("");
  //Form
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<IUpdateQuestionFormValues>();
  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
    update: updateAnswer,
  } = useFieldArray({
    control: control,
    name: `answers`,
  });

  const answersError = errors.answers;

  //Functions
  const handleMarkCorrect = (answerIndex: number) => {
    answerFields.forEach((answer, i) => {
      updateAnswer(i, { text: answer.text, isCorrect: i === answerIndex });
    });
  };
  return (
    <>
      <section>
        {/* Title */}
        <h2 className="w-full bg-blue-600 text-white text-sm py-1.5">
          Question Answers
        </h2>
        {/* Aswers of the question */}
        <Card>
          <CardContent className="text-sm text-muted-foreground">
            <div>
              <div className="flex bg-gray-100 justify-between items-center ps-1">
                <p>Body</p>
                <Button
                  type="button"
                  className="bg-emerald-500"
                  onClick={() => {
                    if (answerFields.length <= 3) {
                      setShowAnswer(!showAnswer);
                    }
                  }}
                >
                  <PlusIcon />
                  Add Answer
                </Button>
              </div>

              <ul>
                {answerFields.map(
                  (
                    answer,
                    answerIndex, // ← answerFields بدل question.answers
                  ) => (
                    <li key={answer.id} className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeAnswer(answerIndex)}
                      >
                        <Trash2Icon />
                      </Button>
                      <div className="flex w-full">
                        <Controller
                          control={control}
                          name={`answers.${answerIndex}.text`}
                          render={({ field }) => (
                            <Input {...field} className="grow" />
                          )}
                        />
                        {answer.isCorrect ? (
                          <div className="text-emerald-500 flex items-center gap-1 shrink-0">
                            <CheckCheck size={16} /> Correct Answer
                          </div>
                        ) : (
                          <Button
                            type="button"
                            variant="secondary"
                            className="shrink-0"
                            onClick={() => handleMarkCorrect(answerIndex)}
                          >
                            <Check />
                            Mark Correct
                          </Button>
                        )}
                      </div>
                      {errors.answers?.[answerIndex]?.text?.message && (
                        <FieldError>
                          {errors.answers?.[answerIndex]?.text?.message}
                        </FieldError>
                      )}
                    </li>
                  ),
                )}
              </ul>
            </div>
            {answersError && (
              <FieldError>
                {answersError.message ?? answersError.root?.message}
              </FieldError>
            )}

            {showAnswer && answerFields.length <= 3 && (
              <div className="flex gap-2 items-center">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={() => {
                    setShowAnswer(false);
                    setNewAnswerText("");
                  }}
                >
                  <XIcon />
                </Button>
                <Input
                  placeholder="Enter answer body"
                  className="grow"
                  value={newAnswerText}
                  onChange={(e) => setNewAnswerText(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={async () => {
                    const value = newAnswerText.trim();

                    if (!value) return;

                    appendAnswer({
                      isCorrect: false,
                      text: value,
                    });

                    setNewAnswerText("");

                    await trigger(`answers`);
                  }}
                >
                  <PlusIcon />
                  Add
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
