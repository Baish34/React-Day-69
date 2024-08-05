import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
    correctAnswer: "4",
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin"],
    correctAnswer: "Paris",
  },
  {
    id: 3,
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ["Harper Lee", "J.K. Rowling", "Stephen King"],
    correctAnswer: "Harper Lee",
  },
];

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (selectedOption) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: selectedOption });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="quiz-container">
      <h2>Quiz App</h2>
      {!showResults ? (
        <>
          <div id="question-container">
            <h3>Question {currentQuestion + 1}</h3>
            <p>{questions[currentQuestion].question}</p>
            <form>
              <ul>
                {questions[currentQuestion].options.map((option, index) => (
                  <li>
                    <div key={index}>
                      <label>
                        <input
                          type="radio"
                          name="option"
                          value={option}
                          checked={userAnswers[currentQuestion] === option}
                          onChange={() => handleAnswerSelect(option)}
                        />
                        {option}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </form>
          </div>
          <button onClick={handleNextQuestion}>Next</button>
        </>
      ) : (
        <div id="result-container">
          <h3>Quiz Result</h3>
          <p>
            You score: {calculateScore()} / {questions.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
