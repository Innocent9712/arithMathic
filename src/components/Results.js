import React, {useContext} from 'react'
import {AppState} from "../App"

function Results() {
    const context = useContext(AppState)
    const {centralState} = context
    console.log(centralState);
    
    return (
        <section>
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
        </section>
    )
}

export default Results
