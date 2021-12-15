// initial state

export const initialState = {
    difficulty: "easy",
    QnA: [],
    mode: "standard"
}

// reducers

export const reducer = (state, action) => {
    switch(action.type) {
        case "SET_DIFFICULTY":
            return {...state, difficulty: action.payload}
        case "UPDATE_RESULT": 
             return {...state, QnA: state.QnA.push(action.payload)}
        case "RESET_RESULT":
            return initialState
        default:
            return state;
            
    }
}