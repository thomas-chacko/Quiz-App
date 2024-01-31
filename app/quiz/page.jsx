"use client";
import { useState } from "react";
import { quiz } from "../data";

const page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const handleSubmit = (answers, i) => {
    setChecked(true);
    setSelectedAnswerIndex(i);
    if (answers === correctAnswer) {
      setSelectedAnswer(true);
      console.log(true);
    } else {
      setSelectedAnswer(false);
      console.log(false);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5 text-white bg-black">
      <h1 className="text-3xl">Quiz Page</h1>
      <div>
        {!showResult && (
          <h1 className="text-xl">
            {activeQuestion + 1}
            <span className="text-green-500">/{questions.length}</span>
          </h1>
        )}
      </div>
      {!showResult ? (
        <div>
          <h1 className="text-xl">{questions[activeQuestion].question}</h1>
          {answers?.map((item, i) => (
            <li
              onClick={() => handleSubmit(item, i)}
              key={i}
              className={
                selectedAnswerIndex === i
                  ? "bg-green-500 p-2 my-4 list-none border cursor-pointer"
                  : "p-2 my-4 list-none border cursor-pointer"
              }
            >
              {item}
            </li>
          ))}
          {checked ? (
            <button
              onClick={nextQuestion}
              className="w-full bg-blue-600 text-white px-4 py-1"
            >
              Next
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled
              className="w-full bg-red-600 text-white px-4 py-1 "
            >
              Next !
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col  gap-3 text-lg">
          <h3 className="text-2xl text-center">Results</h3>
          <p>
            Total Questions : <span>{questions.length}</span>
          </p>
          <p>
            Total Score : <span>{result.score}</span>
          </p>
          <button
            className="w-full bg-blue-600 text-white px-4 py-1"
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};
export default page;
