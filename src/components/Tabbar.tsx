import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../store'
import { hashchange, clearCompleted } from '../store/todoSlice'
// import { TodoContext } from '../App'

const Tabbar: FC = () => {
  const dispatch = useDispatch()
  const nowShowing = useAppSelector(state => state.todo.nowShowing)
  const todoList = useAppSelector(state => state.todo.list)

  const activeCount = todoList.reduce((accum, todo) => {
    return todo.completed ? accum : accum + 1
  }, 0)
  const onHashChange = () => {
    dispatch(hashchange())
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
      <button className="clear-completed" onClick={() => dispatch(clearCompleted())}>
        Clear completed
      </button>
    </footer>
  )
}
export default Tabbar
