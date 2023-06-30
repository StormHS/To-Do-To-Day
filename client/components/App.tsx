import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DayTaskList from './DayTaskList'
import CompletedTasks from './CompletedTasks'


export default function App() {
  return (
    <section>
      <Router>
        <div>
          <Routes>
            {/* remove path/todo and make the element of todo be the element of path / */}
            <Route path="/" element={<DayTaskList />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </div>
      </Router>
    </section>
  )
}
