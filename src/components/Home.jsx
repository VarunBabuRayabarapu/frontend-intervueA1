import { useState } from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [role, setRole] = useState();
    const navigate = useNavigate();
    const handleContinue = () => {
        const cookieName = "intervue-a1-role";
        const cookieValue = role;
        const daysToExpire = 70;

        const date = new Date();
        date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();

        document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/`;
        if (role === "student") {
            navigate("/add-name");
        }
        else {
            navigate("/add-question");
        }
    };
    return (
        <div className='home-container'>
            <div className='poll-head'>
                <div className='poll-head-content'>
                    <img src='/stars.png' alt='Poll' />
                    <h1>Intervue Poll</h1>
                </div>
            </div>
            <div className='headings-home'>
                <h1>Welcome to the <span>Live Polling System</span></h1>
                <h2>Please select the role that better describes you to begin using the live polling system</h2>
            </div>
            <div className='role-options-home'>
                <div onClick={() => setRole('student')} className={role === 'student' ? 'role-option-selected' : 'role-option'}>
                    <h3>I'm a Student</h3>
                    <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h4>
                </div>
                <div onClick={() => setRole('teacher')} className={role === 'teacher' ? 'role-option-selected' : 'role-option'}>
                    <h3>I'm a teacher</h3>
                    <h4>Submit answers and view live poll results in real-time.</h4>
                </div>
            </div>
            <div className='btns-home'>
                <button onClick={handleContinue} disabled={!role}>Continue</button>
            </div>
        </div>
    )
}

export default Home;