import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DayTaskList from './DayTaskList'

export default function App() {
  return (
    <section>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<DayTaskList />} />
          </Routes>
        </div>
      </Router>
    </section>
  )
}
