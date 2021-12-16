import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { AppState } from '../App'

function HomePage() {
    const context = useContext(AppState)
    const {centralState,reducers} = context
    console.log(centralState)

    
    return (
        <section className="home">
            <div className="intro">
                <h3>Ready to have some fun with maths?</h3>
                <p>Take this fun math game to test your skill as an expert at basic arithmetic operation</p>
            </div>
            <div>
                <h5>Difficulty</h5>
                <div>
                    <button onClick={()=> reducers({type:"SET_DIFFICULTY", payload:"easy"})}>Easy</button>
                    <button onClick={()=> reducers({type:"SET_DIFFICULTY", payload:"medium"})}>Medium</button>
                    <button onClick={()=> reducers({type:"SET_DIFFICULTY", payload:"hard"})}>Hard</button>
                </div>
            </div>
            <button><Link to="/question">start</Link></button>
        </section>
    )
}

export default HomePage
