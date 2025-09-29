import { useState } from "react";
import { createQuestion } from "../services/addQuestion";
import io from "socket.io-client";
import "./AddQuestion.css";
import { useNavigate } from "react-router-dom";
import config from "../utils/ApiConfig";

const socket = io(config.API_URL);

const AddQuestion = () => {
    const [options, setOptions] = useState([{ id: 1, value: "", correct: false }]);
    const [question, setQuestion] = useState("");
    const [timer, setTimer] = useState(60);
    const [charCount, setCharCount] = useState(0);

    const navigate = useNavigate();

    const handleOptionChange = (id, value) => {
        setOptions((prev) =>
            prev.map((opt) => (opt.id === id ? { ...opt, value } : opt))
        );
    };

    const handleCorrectChange = (id, correct) => {
        setOptions((prev) =>
            prev.map((opt) => (opt.id === id ? { ...opt, correct } : opt))
        );
    };

    const addOption = () => {
        setOptions((prev) => [...prev, { id: prev.length + 1, value: "", correct: false }]);
    };

    const handleAskQuestion = async () => {
        const payload = {
            question,
            options,
            timer
        };
        const result = await createQuestion(payload);
        socket.emit("new-question", payload);
        if (result.acknowledged) {
            navigate("/view-question");
        }
    };

    return (
        <>
            <div className="add-question-container">
                <div className='poll-head-content'>
                    <img src='/stars.png' alt='Poll' />
                    <h1>Intervue Poll</h1>
                </div>
                <div className='headings-add-question'>
                    <h1>Let’s <span> Get Started</span></h1>
                    <h2>you’ll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.</h2>
                </div>
                <div className="add-question-wrapper">
                    <div className="enter-question">
                        <h3>Enter your question</h3>
                        <select value={timer} onChange={(e) => setTimer(Number(e.target.value))}>
                            <option value={30}>30 seconds</option>
                            <option value={60}>60 seconds</option>
                            <option value={90}>90 seconds</option>
                        </select>
                    </div>
                    <textarea
                        placeholder="Enter question here"
                        value={question}
                        maxLength={100}
                        onChange={(e) => {
                            setQuestion(e.target.value);
                            setCharCount(e.target.value.length);
                        }}
                    />
                    <span>{charCount}/100</span>
                </div>
                <div className="add-options-wrapper">
                    <div className="head-row-options">
                        <h4>Edit Options</h4>
                        <h4>Is it correct</h4>
                    </div>
                    {options.map((opt) => (
                        <div key={opt.id} className="option-row">
                            <div className="option-number">{opt.id}</div>
                            <input
                                value={opt.value}
                                onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                            />
                            <div className="is-correct">
                                <label>
                                    <input
                                        type="radio"
                                        name={`option-${opt.id}`}
                                        checked={opt.correct === true}
                                        onChange={() => handleCorrectChange(opt.id, true)}
                                    />
                                    <span>Yes</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name={`option-${opt.id}`}
                                        checked={opt.correct === false}
                                        onChange={() => handleCorrectChange(opt.id, false)}
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addOption}>+ Add More option</button>
                </div>
            </div>
            <div className="ask-question">
                <button onClick={handleAskQuestion}>Ask Question</button>
            </div>
        </>
    );
};

export default AddQuestion;
