import { useState, useEffect } from "react";
import { getActiveQuestion } from "../services/getActiveQuestion";
import { submitAnswer } from "../services/studentService";
import config from "../utils/ApiConfig";
import { io } from "socket.io-client";
import "./Answer.css";

const socket = io(config.API_URL);

const Answer = () => {
    const [question, setQuestion] = useState(null);
    const [myAnswer, setMyAnswer] = useState(null);
    const [timer, setTimer] = useState(0);
    const [answered, setAnswered] = useState(false);

    const getPercentage = (optionVotes) => {
        if (!question || !question.totalVotes || question.totalVotes === 0) return 0;
        return ((optionVotes.length / question.totalVotes) * 100).toFixed(0);
    };

    useEffect(() => {
        const fetchQuestion = async () => {
            const activeQuestion = await getActiveQuestion();
            if (activeQuestion) {
                setQuestion(activeQuestion);
                setTimer(activeQuestion.timer || 60);
            }
        };
        fetchQuestion();

        socket.on("new-question", (newQuestion) => {
            setQuestion({ ...newQuestion, totalVotes: 0, options: Object.fromEntries(Object.keys(newQuestion.options).map(opt => [opt, []])) });
            setAnswered(false);
            setMyAnswer(null);
            setTimer(newQuestion.timer || 60);
        });

        socket.on("new-answer", (data) => {
            if (question && data.questionId === question._id) {
                const updatedOptions = { ...question.options };
                if (!updatedOptions[data.selectedOption]) updatedOptions[data.selectedOption] = [];
                updatedOptions[data.selectedOption].push(data.studentName);
                setQuestion({ ...question, options: updatedOptions, totalVotes: question.totalVotes + 1 });
            }
        });

        return () => {
            socket.off("new-question");
            socket.off("new-answer");
        };
    }, [question]);

    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleSubmit = async () => {
        if (!myAnswer || !question) return;
        const studentName = document.cookie
            .split("; ")
            .find(row => row.startsWith("intervue-a1-student-name="))
            ?.split("=")[1];
        if (!studentName) return;

        await submitAnswer(question._id, { studentName, selectedOption: myAnswer });
        setAnswered(true);
    };

    if (!question) return <div>Waiting for a question to be posted by the teacher...</div>;

    return (
        <>
            <h1 className="view-question-heading">Question</h1>
            <div className="view-question-container">
                <div className="question-view">
                    <h1>{question.question}</h1>
                    <h3>Time remaining: {timer}s</h3>
                </div>
                <div className="options-list">
                    {Object.entries(question.options).map(([option, voters], index) => {
                        const percentage = answered ? getPercentage(voters) : 0;
                        return (
                            <div className="option-box" key={index}>
                                <div
                                    className={myAnswer === option ? "option-bar-active" : "option-bar"}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                                <div
                                    className={myAnswer === option ? "option-content-active" : "option-content"}
                                    onClick={() => !answered && setMyAnswer(option)}
                                >
                                    <div className="option-text-answer">
                                        <div className="option-text-id-answer">{index}</div>
                                        <span className="option-text-value-answer">{option}</span>
                                    </div>
                                    {answered && <span className="option-percentage">{percentage}%</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="submit">
                <button disabled={!myAnswer || answered} onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
};

export default Answer;
