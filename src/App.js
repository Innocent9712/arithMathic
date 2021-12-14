import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Question from './components/Question';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/question" element={<Question />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
