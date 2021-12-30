import React, {useState, useEffect, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppState } from '../App'
import Keypad from './Keypad'
import "../styles/Question.css"

function Question() {
    const quizTime = 2
    const [hide, setHide] = useState(undefined)
    const context = useContext(AppState)
    const {centralState,reducers} = context
    const questionsArr = centralState.QnA
    console.log(questionsArr)
    console.log(centralState)
    const [counter, setCounter] = useState(`0${quizTime}:00`)
    const [numState, setNumState] = useState(5)
    const [quizState, setQuizState] = useState(false)
    const [questionNumber, setQuestionNumber] = useState(1)
    const [currentQuestion, setCurrentQuestion] = useState(centralState.QnA[0])
    const [answerInput, setAnswerInput] = useState("")
    const navigate = useNavigate()
    const [questionBtn, setQuestionBtn] = useState("next")
    let stopTime = false



    // set interval problem
    let number = 60*quizTime
    useEffect(() => {
        const updateCounter = () => {
            if (numState <= 0 || stopTime ) {
                setQuizState(false)
            } else {            
                number--
                setNumState(number)
                console.log(numState);
                const min = Math.floor(number / 60)
                const secs = number % 60 < 10 ? `0${number%60}`: number % 60
                setCounter(`${min}:${secs}`)
            }

        }

        const interval = quizState === true && setInterval(updateCounter, 1000)
        
        return () => {
            if (number <= 0 ) {
                clearInterval(interval)                
            }
        }
    }, [quizState,number, stopTime])

    //start the quiz timer
    const handleStart = () => {
        setQuizState(true)
        setHide("hide")
    }


    const handleChange = (e) => {
            e.target.name === "answer" && setAnswerInput(e.target.value)
    }


    const handleClick = (e) => {
        e.preventDefault()
        const buttonValue = e.target.value

        if (buttonValue === "next" && questionNumber < centralState.QnA.length) {
            reducers({type: "UPDATE_QUESTION", payload: {id: questionNumber - 1, response:answerInput}})
            setQuestionNumber(prevState => prevState + 1)
            setCurrentQuestion(centralState.QnA[questionNumber - 1])
            setAnswerInput('')
            console.log(currentQuestion)
            if (questionNumber === centralState.QnA.length - 1) {
                setQuestionBtn("submit")
            }
        } else if (buttonValue === "submit") {
            reducers({type: "UPDATE_QUESTION", payload: {id: questionNumber - 1, response:answerInput}})
            // setQuizState(false)
            stopTime = true
            // navigate("/result")      
        }

    }

    const handleResult = () => {
        navigate("/result")
    }

    const keypadClick = (value) => {
        setAnswerInput((prevState)=>(prevState+=value))
    }

    return (
        <section  className="question">{
            numState > 0 && !quizState ? (
                <div className="sub_container start_section">
                    <h3>Start Test!</h3>
                    <p>You have a set of questions(20) and a set timer of {quizTime} mins.</p>
                    <p>Answer all questions before the time runs out!</p><br/>
                    <p>click start to begin</p>
                </div>
            ): numState > 0 && quizState ? (
                <div className="sub_container main_question">
                    <h4>Question No. {questionNumber}</h4>
                    <p>{centralState.QnA[questionNumber - 1].question}</p>
                    <label>answer</label>
                    <input type="number" name="answer" value={answerInput} onChange={handleChange} />
                    <button  type="submit" onClick={handleClick} value={questionBtn}>{questionBtn}</button>
                </div>
            ): (
                <div className="sub_container start_section">
                    <h3>Time up!</h3>
                    <button onClick={handleResult}>see result</button>
                </div>
            )
        }
            <p className="counter">{counter}</p>
            <button className={`question_start start ${hide}`} onClick={handleStart}>start</button>
            <button className="question_end" onClick={()=> setQuizState(false)}>done</button>
            {
                window.innerWidth < 780 && <Keypad keypadClick={keypadClick}/>
            }
        </section>
    )
}

export default Question
