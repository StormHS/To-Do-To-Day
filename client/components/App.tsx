import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DayTaskList from './DayTaskList'

export default function App() {
  return (
    <section>
      <Router>
        <div>
          <Routes>
            {/* remove path/todo and make the element of todo be the element of path / */}
            <Route path="/" element={<DayTaskList />} />
          </Routes>
        </div>
      </Router>
    </section>
  )
}
