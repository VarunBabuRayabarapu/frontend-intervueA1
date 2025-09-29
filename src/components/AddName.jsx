import { useState } from "react";
import { addStudent } from "../services/studentService";
import "./AddName.css";
import { useNavigate } from "react-router-dom";

const AddName = () => {
    const [studentName, setStudentName] = useState("");
    const navigate = useNavigate();

    const handleContinue = async () => {
        const cookieName = "intervue-a1-student-name";
        const daysToExpire = 7;
        const date = new Date();
        date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${cookieName}=${studentName}; ${expires}; path=/`;

        const result = await addStudent({ name: studentName });
        if (result.acknowledged) {
            navigate("/answer");
        }
    };

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
            <button disabled={!studentName} className="add-name-continue" onClick={handleContinue}> Continue</button>
        </div>
    )
}

export default AddName;
