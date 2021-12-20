import React from 'react'
import "../styles/Keypad.css"
function Keypad({keypadClick}) {
    const arr = []
    for (let index = 0; index < 10; index++) {
        arr.push(<li key={index} onClick={()=> keypadClick(index)}>{index}</li>)
        
    }
    return (
        <ul className="keypad">
            {
                arr
            }
        </ul>
    )
}

export default Keypad
