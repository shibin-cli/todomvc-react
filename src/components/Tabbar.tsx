import { FC } from 'react'

interface Props {
  activeCount: number
  nowShowing: string
  clearCompleted: () => void
}
const Tabbar: FC<Props> = props => {
  const { activeCount, nowShowing, clearCompleted } = props
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> item left
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
