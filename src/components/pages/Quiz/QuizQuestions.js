import {useEffect, useState} from "react";
import {addScore} from "../../../services/Firebase/FirebaseQuestion"
import ShowScore from "./ShowScore";
import {useSelector} from "react-redux";
import RightIcon from "../../../assets/icon/RightIcon"
function QuizQuestion() {
  const {user} = useSelector((state) => state.auth);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState("");
  const [trueAnswer, setTrueAnswer] = useState(0);
  const [falseAnswer, setFalseAnswer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const {question} = useSelector((state) => state.questions);

  useEffect(() => {
    setTimeLeft(15);
  }, [currentQuestion]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < question.length) {
          setCurrentQuestion(nextQuestion);
          setTimeLeft(15);
        } else {
          setShowScore(true);
        }
      } else {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, currentQuestion, question.length]);

  const handleAnswerOptionClick = (choice) => {
    if (question[currentQuestion].correctChoice === choice) {
      setScore((prevScore) => prevScore + 1);
      setTrueAnswer((prevTrueAnswer) => prevTrueAnswer + 1);
    } else {
      setFalseAnswer((prevFalseAnswer) => prevFalseAnswer + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < question.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(15);
    } else {
      setShowScore(true);
    }
    setSelected(null);
  };

  const addScoreData = async ({trueAnswer, falseAnswer, score, questions}) => {
    await addScore({
      uid: user.uid,
      email: user.email,
      score: score,
      trueAnswer: trueAnswer,
      falseAnswer: falseAnswer,
      questions: question.length,
      date: new Date().toLocaleString(),
    });
  };

  useEffect(() => {
    if (showScore) {
      addScoreData({trueAnswer, falseAnswer, score, question});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScore]);

  const handleRestart = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setFalseAnswer(0);
    setTrueAnswer(0);
    setSelected(null);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < question.length) {
      setCurrentQuestion(nextQuestion);
      console.log(nextQuestion);
    }
  };

  return (
    <div className="quiz flex justify-center">
      <div className=" w-full max-w-3xl">
        <div className=" rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-8 p-5 bg-white mt-14 shadow-md rounded">
            <div className="flex justify-between  items-center"></div>
            {!showScore ? (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex items-center my-5">
                    <h1 className="text-lg rounded-lg bg-gray-200 p-2 shadow-sm text-gray-600">
                      Soru {currentQuestion + 1} / {question.length}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div
                    className="flex justify-center h-2 rounded-full overflow-hidden transition-all duration-1000"
                    style={{
                      width: `${(timeLeft / 15) * 100}%`,
                      background: timeLeft < 5 ? "red" : "turquoise",
                    }}
                  ></div>
                  {/* <div className="flex items-center">
      <p className="text-red-500 font-bold ml-2">{timeLeft}</p>
    </div> */}
                </div>
                <div className="my-4">
                  <p className="text-gray-800 text-lg font-bold mb-2">
                    {question[currentQuestion]?.question}
                  </p>
                  <div className="flex flex-col">
                    {question[currentQuestion]?.question &&
                      Object.entries(question[currentQuestion]?.choices).map(
                        ([key, value]) => (
                          <label
                            key={key}
                            className={`inline-flex items-center p-2 mb-2 text-left rounded-lg cursor-pointer shadow-sm m-1 ${
                              selected === key
                                ? "bg-emerald-400 text-white hover:bg-emerald-200 "
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelected(key)}
                          >
                            <input
                              type="radio"
                              className="hidden"
                              name="choice"
                              value={key}
                            />
                            <span className="ml-2">{value}</span>
                          </label>
                        )
                      )}
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  {selected && (
                    <button
                      className="rounded-lg bg-emerald-400 hover:bg-emerald-600 inline-flex text-white font-bold py-2 px-4 items-center"
                      onClick={() => handleAnswerOptionClick(selected)}
                    >
                      <span className="ml-2">Sonraki Soru</span>
                     <RightIcon />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <ShowScore
                score={score}
                trueAnswer={trueAnswer}
                falseAnswer={falseAnswer}
                questions={question}
                handleRestart={handleRestart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizQuestion;
