import { useState, useEffect } from "react";
import { getActiveQuestion } from "../services/getActiveQuestion";
import { io } from "socket.io-client";
import "./ViewQuestion.css";
import { useNavigate } from "react-router-dom";
import config from "../utils/ApiConfig";

const socket = io(config.API_URL);

const ViewQuestion = () => {
    const [question, setQuestion] = useState(null);
    const navigate = useNavigate();

    const getPercentage = (optionVotes) => {
        if (!question || !question.totalVotes || question.totalVotes === 0) return 0;
        return ((optionVotes.length / question.totalVotes) * 100).toFixed(0);
    };

    useEffect(() => {
        const fetchQuestion = async () => {
            const activeQuestion = await getActiveQuestion();
            setQuestion(activeQuestion);
        };
        fetchQuestion();

        socket.on("new-answer", (data) => {
            if (question && data.questionId === question._id) {
                const updatedOptions = { ...question.options };
                if (!updatedOptions[data.selectedOption]) updatedOptions[data.selectedOption] = [];
                updatedOptions[data.selectedOption].push(data.studentName);
                setQuestion({ ...question, options: updatedOptions, totalVotes: question.totalVotes + 1 });
            }
        });

        socket.on("new-question", (newQuestion) => {
            setQuestion({ ...newQuestion, totalVotes: 0, options: Object.fromEntries(Object.keys(newQuestion.options).map(opt => [opt, []])) });
        });

        return () => {
            socket.off("new-answer");
            socket.off("new-question");
        };
    }, [question]);

    if (!question) return <div><h1>Oops! no active question</h1><div className="ask-new-question">
        <button onClick={() => navigate("/add-question")}>+ Ask a new question</button>
    </div></div>;

    return (
        <>
            <div className="poll-history">
                <button onClick={() => navigate("/all-polls")}>
                    <img src="/eye.png" alt="Poll History" />
                    <h2>View Poll history</h2>
                </button>
            </div>
            <h1 className="view-question-heading">Question</h1>
            <div className="view-question-container">
                <div className="question-view">
                    <h1>{question.question}</h1>
                </div>
                <div className="options-list">
                    {Object.entries(question.options).map(([option, voters], index) => {
                        const percentage = getPercentage(voters);
                        return (
                            <div className="option-box" key={index}>
                                <div
                                    className="option-bar"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                                <div className="option-content">
                                    <div className="option-text">
                                        <div className="option-text-id">{index}</div>
                                        <span className="option-text-value">{option}</span>
                                    </div>
                                    <span className="option-percentage">{percentage}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="ask-new-question">
                <button onClick={() => navigate("/add-question")}>+ Ask a new question</button>
            </div>
        </>
    );
};

export default ViewQuestion;
