import { useState, useEffect } from "react";
import "./ViewQuestion.css";

const ViewQuestion = () => {
    const [question, setQuestion] = useState({
        question: "Which planet is known as the Red Planet?",
        options: {
            mars: ["Ash", "Beena"],
            venus: ["Ash", "Beena", "Kay"],
            maps: ["Ash", "Beena"],
            vetus: ["Ash", "Beena", "Kay"],
        },
        totalVotes: 10,
    });

    const getPercentage = (optionVotes) => {
        if (!question.totalVotes || question.totalVotes === 0) return 0;
        return ((optionVotes.length / question.totalVotes) * 100).toFixed(0);
    };

    return (
        <>
            <div className="poll-history">
                <button>
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
                                    <div className="option-text"> <div className="option-text-id"> {index}</div> <span className="option-text-value"> {option}</span> </div>
                                    <span className="option-percentage">{percentage}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="ask-new-question">
                <button>
                    + Ask a new question
                </button>
            </div>
        </>
    );
};

export default ViewQuestion;
