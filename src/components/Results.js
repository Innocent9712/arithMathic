import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router'
import {AppState} from "../App"
import "../styles/Results.css"

function Results() {
    const context = useContext(AppState)
    const {centralState} = context
    const [score, setScore] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {   
            for (let index = 0; index < centralState.QnA.length; index++) {
                if (centralState.QnA[index].correct) {
                    setScore(prevState => prevState + 1)
                }                
            }
    }, [])
    
    return (
        <section>
            <h3 className="score">{`You scored ${score} out of ${centralState.QnA.length}`}</h3>
            <ul className="results">
                {
                    centralState.QnA.map((item, index)=>{
                        return (
                            <li className={`${item.correct ? "green":"red"}`} key={index}>
                                <h4>Question: {item.question}</h4>
                                <p>Answer: {item.response}</p>
                                {!item.correct && <p>correct answer: {item.answer}</p>}
                            </li>
                        )
                    })
                }
            </ul>
            <div className="result_nav">
                <button onClick={()=> navigate("/question")}>{"<< Restart"}</button>
                <button onClick={()=> navigate("/")}>{"Home >>"}</button>
            </div>
        </section>
    )
}

export default Results
