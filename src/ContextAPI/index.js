// initial state
import { questions } from '../data'


export const initialState = {
    difficulty: "easy",
    QnA: [...questions],
    mode: "standard"
}

    //set questions state to generated questions
    // reducers({type:"SET_QUESTIONS", payload: questions})
// reducers

export const reducer = (state, action) => {
    switch(action.type) {
        case "SET_QUESTIONS":
            return {...state, QnA: action.payload}
        case "SET_DIFFICULTY":
            return {...state, difficulty: action.payload}
        case "UPDATE_QUESTION":
            for (let index = 0; index < state.QnA.length; index++) {
                if (action.payload.id === state.QnA.indexOf(state.QnA[index])) {
                    state.QnA[index].response = action.payload.response
                    state.QnA[index].correct = Number(state.QnA[index].response) === state.QnA[index].answer ? true : false
                }
                
            }
            return {...state}
        case "UPDATE_RESULT": 
             return {...state, QnA: action.payload}
        case "RESET_RESULT":
            return initialState
        default:
            return state;
            
    }
}