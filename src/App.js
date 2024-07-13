import React, { useState, useEffect } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timer, setTimer] = useState(60);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); 

  const questions = [
    {
      question: 'Which of the following is used in React.js to increase performance?',
      options: ['Memoization', 'Virtual DOM', 'State management', 'Component reusability'],
      correctAnswer: 2,
    },
    {
      question: 'What is the purpose of useEffect() hook in React?',
      options: ['To handle form submissions', 'To fetch data from an API', 'To manage component state', 'To render JSX elements'],
      correctAnswer: 1,
    },
    {
      question: 'What is the output of the following code?\n\nconsole.log(1 + "2" + "2");',
      options: ['122', '15', 'NaN', 'Error'],
      correctAnswer: 1,
    },
    {
      question: 'What is the output of the following code?\n\nconsole.log(1 + +"2" + "2");',
      options: ['122', '15', '32', 'Error'],
      correctAnswer: 3,
    },
    {
      question: 'What is the output of the following code?\n\nconsole.log(1 + -"1" + "2");',
      options: ['12', '02', '02', 'Error'],
      correctAnswer: 4,
    },
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1); 

      if (timer === 0 && currentQuestion !== questions.length - 1) {
        handleNextQuestion(); 
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer, currentQuestion]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== '') {
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      setSelectedOption('');
      setCurrentQuestion(currentQuestion + 1);

      if (currentQuestion === questions.length - 1) {
        setIsQuizCompleted(true); 
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'blue' }}>Quiz Page</h1>
      <p style={{ textAlign: 'center' }}>Timer: {timer} seconds</p>
      {isQuizCompleted ? (
        <div>
          <h2 style={{ textAlign: 'center', color: 'green' }}>Quiz completed!</h2>
          <p style={{ textAlign: 'center' }}>Your score: {score}</p>
        </div>
      ) : (
        <div>
          <h2 style={{ textAlign: 'center' }}>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={index + 1}
                    checked={selectedOption === index + 1}
                    onChange={() => handleOptionSelect(index + 1)}
                  />
                  <span style={{ marginLeft: '5px' }}>{option}</span>
                </label>
              </li>
            ))}
          </ul>
          <button style={{ display: 'block', margin: '0 auto' }} onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;
 