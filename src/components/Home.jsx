import { React, useState } from 'react';
import "./Home.css";

const Home = () => {
    const [role, setRole] = useState();
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
                <div onClick={()=> setRole('student')} className= {role === 'student' ? 'role-option-selected' : 'role-option'}>
                    <h3>I'm a Student</h3>
                    <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h4>
                </div>
                <div onClick={()=> setRole('teacher')} className={role === 'teacher' ? 'role-option-selected' : 'role-option'}>
                    <h3>I'm a teacher</h3>
                    <h4>Submit answers and view live poll results in real-time.</h4>
                </div>
            </div>
            <div className='btns-home'>
                <button disabled ={!role}>Continue</button>
            </div>
        </div>
    )
}

export default Home;