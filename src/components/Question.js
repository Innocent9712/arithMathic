import React, {useState, useEffect, useContext, useRef} from 'react'
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
    // const [answerInput, setAnswerInput] = useState("")
    const answerInput = useRef("")
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
                navigate("/result")              
            }
        }
    }, [quizState,number, stopTime])

    //start the quiz timer
    const handleStart = () => {
        setQuizState(true)
        setHide("hide")
    }


    const handleChange = (e) => {
            // e.target.name === "answer" && setAnswerInput(e.target.value)
    }


    const handleClick = (e) => {
        e.preventDefault()
        const buttonValue = e.target.value

        if (buttonValue === "next" && questionNumber < centralState.QnA.length) {
            reducers({type: "UPDATE_QUESTION", payload: {id: questionNumber - 1, response:answerInput.current.value}})
            setQuestionNumber(prevState => prevState + 1)
            setCurrentQuestion(centralState.QnA[questionNumber - 1])
            answerInput.current.value = ""
            console.log(currentQuestion)
            if (questionNumber === centralState.QnA.length - 1) {
                setQuestionBtn("submit")
            }
        } else if (buttonValue === "submit") {
            reducers({type: "UPDATE_QUESTION", payload: {id: questionNumber - 1, response:answerInput.current.value}})
            setQuizState(false)
            // stopTime = true
            navigate("/result")   
        }

    }

    const handleResult = () => {
        navigate("/result")
    }

    const keypadClick = (value) => {
        // setAnswerInput((prevState)=>(prevState+=value))
        answerInput.current.value += value
    }

    const handleDelete = () => {
        // setAnswerInput(prevState => (prevState.slice(0, -1)))
        let currentValue = answerInput.current.value
        const futureValue = currentValue.toString().slice(0, -1)
        answerInput.current.value = futureValue   
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
                    <input type="number" name="answer" ref={answerInput} readOnly={window.innerWidth < 780 && "readonly"} />
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
            <div className="quiz_btns">
                <button className={`quiz_btn ${hide}`} onClick={handleStart}>start</button>
                <button className={`quiz_btn question_end ${!quizState ? "hide": undefined}`} onClick={handleResult}>done</button>
            </div>
            {
                window.innerWidth < 780 && <Keypad keypadClick={keypadClick} edit={handleDelete}/>
            }
        </section>
    )
}

export default Question
