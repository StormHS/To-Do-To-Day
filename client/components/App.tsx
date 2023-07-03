import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import DayTaskList from './DayTaskList'
import CompletedTasks from './CompletedTasks'
import NavBar from './NavBar'      
import Home from './Home'

export default function App() {
  return (
    <section>
      <IfNotAuthenticated>
        <Home />
      </IfNotAuthenticated>
      <Router>
        <NavBar />
        <div>
          <IfAuthenticated>
            <Routes>
              {/* remove path/todo and make the element of todo be the element of path / */}
              <Route path="/" element={<DayTaskList />} />
              <Route path="/completed" element={<CompletedTasks />} />
            </Routes>
          </IfAuthenticated>
        </div>
      </Router>
    </section>
  )
}
