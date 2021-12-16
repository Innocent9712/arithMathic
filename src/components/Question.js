import React, {useState, useEffect, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { questions } from '../data'
import { AppState } from '../App'

function Question() {
    const context = useContext(AppState)
    const {reducers} = context
    const questionsArr = questions
    const [counter, setCounter] = useState(60)
    const [quizState, setQuizState] = useState(false)
    const [answeredQuestions, setAnsweredQuestions] = useState([])
    const [questionNumber, setQuestionNumber] = useState(answeredQuestions.length + 1)
    const [currentQuestion, setCurrentQuestion] = useState(questionsArr[0])
    const [answerInput, setAnswerInput] = useState("")
    const navigate = useNavigate()
    console.log(currentQuestion)
    console.log(questionsArr)
    console.log(answeredQuestions)

    // set interval problem
    let number = 60
    
    const recursiveFnc = () => {
        let timeout
        if (number > 0) {
            setTimeout(() => {
                number--
                setCounter(number)
                console.log(number)
                recursiveFnc()               
            }, 1000);
        } else {
            setQuizState(false)
            console.log(quizState)
        }
    }

    const handleStart = () => {
        setQuizState(true)
        recursiveFnc()
    }


    const handleChange = (e) => {
            e.target.name === "answer" && setAnswerInput(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (questionsArr.length > 0 ) {
            const newObj = {
                question: currentQuestion.question,
                answer: currentQuestion.answer(),
                response: Number(answerInput),
                correct: Number(answerInput) === currentQuestion.answer() ? true : false
            }
            setAnsweredQuestions(prevState=> [...prevState, newObj])
            questionsArr.shift()
            setCurrentQuestion(questionsArr[0])
            setQuestionNumber(answeredQuestions.length + 2)
            setAnswerInput("")
            
        } else {
            alert("all questions have been answered.")
        }
    }

    const handleResult = () => {
        reducers({type:"UPDATE_RESULT", payload: answeredQuestions})
        navigate("/result")
    }

    return (
        <section  className="question">{
            counter > 0 && !quizState ? (
                <div>
                    <h3>Start Test!</h3>
                    <p>click start to begin</p>
                </div>
            ): counter > 0 && quizState ? (
                <div>
                    <h4>Question No. {questionNumber}</h4>
                    <p>{currentQuestion.question}</p>
                    <label>answer</label>
                    <input type="number" name="answer" value={answerInput} onChange={handleChange} />
                    <button type="submit" onClick={handleClick}>next</button>
                </div>
            ): (
                <div>
                    <h3>Time up!</h3>
                    <button onClick={handleResult}>see result</button>
                </div>
            )
        }
            <p>{counter}</p>
            <button className={`start ${quizState?"hide": undefined}`} onClick={handleStart}>begin</button>
            <button onClick={()=> setQuizState(false)}>done</button>
        </section>
    )
}

export default Question
