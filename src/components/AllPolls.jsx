import { useState } from "react";
import "./ViewQuestion.css";

const AllPolls = () => {
    const [questions, setQuestions] = useState([
        {
            question: "Which planet is known as the Red Planet?",
            options: {
                mars: ["Ash", "Beena"],
                venus: ["Ash", "Beena", "Kay"],
                maps: ["Ash", "Beena"],
                vetus: ["Ash", "Beena", "Kay"],
            },
            totalVotes: 10,
        },
        {
            question: "Which planet is known as the Red Plajjjfj j  n net?",
            options: {
                mars: ["Ash", "Beena"],
                venus: ["Ash", "Beena", "Kay"],
                maps: ["Ash", "Beena"],
                vetus: ["Ash", "Beena", "Kay"],
            },
            totalVotes: 10,
        },
        {
            question: "Which planet is known as the Rejbjbjkbd Planet?",
            options: {
                mars: ["Ash", "Beena"],
                venus: ["Ash", "Beena", "Kay"],
                maps: ["Ash", "Beena"],
                vetus: ["Ash", "Beena", "Kay"],
            },
            totalVotes: 10,
        },
    ]);

    const getPercentage = (optionVotes, totalVotes) => {
        if (!totalVotes || totalVotes === 0) return 0;
        return ((optionVotes.length / totalVotes) * 100).toFixed(0);
    };

    return (
        <>
            <h1 className="view-all-heading">
                View <span>Poll History</span>
            </h1>

            {questions.map((question, ind) => (
                <div key={ind} className="question-block">
                    <h2 className="view-question-heading">Question {ind + 1}</h2>
                    <div className="view-question-container">
                        <div className="question-view">
                            <h1>{question.question}</h1>
                        </div>

                        <div className="options-list">
                            {Object.entries(question.options).map(([option, voters], index) => {
                                const percentage = getPercentage(voters, question.totalVotes);
                                return (
                                    <div className="option-box" key={index}>
                                        <div
                                            className="option-bar"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                        <div className="option-content">
                                            <div className="option-text">
                                                <div className="option-text-id">{index + 1}</div>
                                                <span className="option-text-value">{option}</span>
                                            </div>
                                            <span className="option-percentage">{percentage}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AllPolls;
