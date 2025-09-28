import { useState } from "react";
import "./AddQuestion.css";
const AddQuestion = () => {
    const [options, setOptions] = useState([
        {
            id: 1,
            value: "",
            correct: false
        }
    ]);
    const [question, setQuestion] = useState();
    const [timer, setTimer] = useState(60);

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
                        <select onChange={(e) => setTimer(e.target.value)}>
                            <option value={30}> 30 seconds</option>
                            <option value={60}> 60 seconds</option>
                            <option value={90}> 90 seconds</option>
                        </select>
                    </div>
                    <textarea placeholder="Enter question here" />
                    <span>0/100</span>
                </div>
                <div className="add-options-wrapper">
                    <div className="head-row-options">
                        <h4>Edit Options</h4>
                        <h4>Is it correct</h4>
                    </div>
                    {options.map((opt) => (
                        <div key={opt.id} className="option-row">
                            <div className="option-number">{opt.id}</div>
                            <input />
                            <div className="is-correct">
                                <label >
                                    <input
                                        type="radio"
                                        name={`option-${opt.id}`}
                                        value={true}
                                    />
                                    <span>Yes</span>
                                </label>
                                <label >
                                    <input
                                        type="radio"
                                        name={`option-${opt.id}`}
                                        value={false}
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                    ))}
                    <button>+ Add More option</button>
                </div>
            </div>
            <div className="ask-question">
                <button>Ask Question</button>
            </div>
        </>
    )
}

export default AddQuestion;