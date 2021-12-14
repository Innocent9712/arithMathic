import React, {useState} from 'react'
import { questions } from '../data'

function Question() {
    const questionsArr = questions
    const [answeredQuestions, setAnsweredQuestions] = useState([])
    const [questionNumber, setQuestionNumber] = useState(answeredQuestions.length + 1)
    const [currentQuestion, setCurrentQuestion] = useState(questionsArr[0])
    const [answerInput, setAnswerInput] = useState("")
    console.log(currentQuestion)
    console.log(questionsArr)
    console.log(answeredQuestions)



    const handleChange = (e) => {
            e.target.name === "answer" && setAnswerInput(e.target.value)

    }

    const handleClick = (e) => {
        e.preventDefault()
        if (questionsArr.length > 0 ) {
            const newObj = {
                question: currentQuestion.question,
                answer: currentQuestion.answer,
                response: Number(answerInput),
                correct: Number(answerInput) === currentQuestion.answer ? true : false
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

    return (
        <div>
            <h4>Question No. {questionNumber}</h4>
            <p>{currentQuestion.question}</p>
            <label>answer</label>
            <input type="number" name="answer" value={answerInput} onChange={handleChange} />
            <button type="submit" onClick={handleClick}>next</button>
        </div>
    )
}

export default Question
