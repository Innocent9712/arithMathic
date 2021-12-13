import React, {useState} from 'react'

function HomePage() {
    const [difficulty, setDifficulty] = useState("")

    const handleDifficulty = (value) => {
        setDifficulty(value)
    }

    
    return (
        <section className="home">
            <div className="intro">
                <h3>Ready to have some fun with maths?</h3>
                <p>Take this fun math game to test your skill as an expert at basic arithmetic operation</p>
            </div>
            <div>
                <h5>Difficulty</h5>
                <div>
                    <button onClick={()=> handleDifficulty("easy")}>Easy</button>
                    <button onClick={()=> handleDifficulty("medium")}>Medium</button>
                    <button onClick={()=> handleDifficulty("hard")}>Hard</button>
                </div>
            </div>
            <button>start</button>
        </section>
    )
}

export default HomePage
