import { useState } from "react";
import "./AddName.css";

const AddName = () => {
    const [studentName, setStudentName] = useState("");
    return (
        <div className="add-name-container">
            <div className='poll-head-content'>
                <img src='/stars.png' alt='Poll' />
                <h1>Intervue Poll</h1>
            </div>
            <div className='headings-add-name'>
                <h1>Let’s <span> Get Started</span></h1>
                <h2> If you’re a student, you’ll be able to <span>submit your answers</span>, participate in live polls, and see how your responses compare with your classmates</h2>
            </div>
            <div className="add-name-content">
                <h3>Enter your Name</h3>
                <input autoFocus={true} placeholder="Enter Here" onChange={(e) => setStudentName(e.target.value)} />
            </div>
            <button disabled={!studentName} className="add-name-continue"> Continue</button>
        </div>
    )
}

export default AddName;