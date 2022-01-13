import React from 'react'
import "../styles/Keypad.css"
import del from "../assets/remove.png"
function Keypad({keypadClick, edit}) {
    const arr = []
    for (let index = 0; index < 10; index++) {
        arr.push(<li className="key" key={index} onClick={()=> keypadClick(index)}>{index}</li>)
        
    }
    return (
        <ul className="keypad">
            {
                arr
            }
            <li className="del key" onClick={()=>edit()}>
                <img src={del} alt="delete" />
            </li>
        </ul>
    )
}

export default Keypad
