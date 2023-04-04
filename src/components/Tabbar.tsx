import { FC, useContext, useEffect } from 'react'
import { TodoContext } from '../App'

const Tabbar: FC = () => {
  const { state, dispatch } = useContext(TodoContext)
  const { nowShowing } = state

  function clearCompleted() {
    dispatch({
      type: 'clearCompleted',
    })
  }
  const activeCount = state.todoList.reduce((accum, todo) => {
    return todo.completed ? accum : accum + 1
  }, 0)
  const onHashChange = () => {
    dispatch({
      type: 'hashchange',
    })
  }
  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> item left{' '}
      </span>
      <ul className="filters">
        <li>
          <a className={nowShowing === 'all' ? 'selected' : ''} href="#/">
            All
          </a>
        </li>
        <li>
          <a href="#/active" className={nowShowing === 'active' ? 'selected' : ''}>
            Active
          </a>
        </li>
        <li>
          <a href="#/completed" className={nowShowing === 'completed' ? 'selected' : ''}>
            Completed
          </a>
        </li>
      </ul>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
export default Tabbar
