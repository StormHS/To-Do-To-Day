import { useTasks } from '../hooks/useTasks'
import companion from '../../images/companion.png'

function App() {
  const { data } = useTasks()

  return (
    <>
      <div className="app">
        <h1>To Do To Day</h1>
        {/* <ul>{data && data.map((task) => <li key={task}>{task}</li>)}</ul> */}
        <div>
          <img className="companion-img" src={companion} alt="Little animal" />
        </div>
        <button>login</button>
      </div>
    </>
  )
}

export default App
