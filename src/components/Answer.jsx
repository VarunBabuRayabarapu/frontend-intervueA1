import { useState, useEffect } from "react";
import "./Answer.css";

const Answer = () => {
    const [question, setQuestion] = useState({
        question: "Which planet is known as the Red Planet?",
        options: {
            mars: ["Ash", "Beena"],
            venus: ["Ash", "Beena", "Kay"],
            maps: ["Ash", "Beena"],
            vetus: ["Ash", "Beena", "Kay"],
        },
        totalVotes: 0,
    });
    const [myAnswer, setMyAnswer] = useState();

    const getPercentage = (optionVotes) => {
        if (!question.totalVotes || question.totalVotes === 0) return 0;
        return ((optionVotes.length / question.totalVotes) * 100).toFixed(0);
    };

    return (
        <>
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
                                    className={myAnswer === option ? "option-bar-active" : "option-bar"}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                                <div className={myAnswer === option ? "option-content-active" : "option-content"} onClick={() => setMyAnswer(option)}>
                                    <div className="option-text-answer"> <div className="option-text-id-answer"> {index}</div> <span className="option-text-value-answer"> {option}</span> </div>
                                    <span className="option-percentage">{percentage}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="submit">
                <button>
                    Submit
                </button>
            </div>
        </>
    );
};

export default Answer;
