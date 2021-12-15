import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Question from './components/Question';
import {initialState, reducer} from "./ContextAPI"
import React, {useReducer} from 'react';


export const AppState = React.createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppState.Provider value = {{centralState: state, reducers: dispatch}}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/question" element={<Question />} />
          </Routes>
        </div>
      </Router>      
    </AppState.Provider>
  );
}

export default App;
