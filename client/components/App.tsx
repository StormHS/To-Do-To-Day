import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import DayTaskList from './DayTaskList'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function App() {
  return ( 
  <section>
    <Router>
      <div>
      <Routes>
        {/* remove path/todo and make the element of todo be the element of path / */}
          <Route path='/' element={<DayTaskList />} />
      </Routes>
      </div>
    </Router>
  </section>)
}