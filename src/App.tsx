import Footer from './components/Footer'
import TodoItem from './components/TodoItem'
import Tabbar from './components/Tabbar'
import {
  addTodo,
  wordChange,
  toggleTodoItem,
  deleteTodo,
  saveTodo,
  saveLocal,
} from './store/todoSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from './store'

function App() {
  const [editing, setEditing] = useState<number | null>(null)

  const todoList = useAppSelector(state => state.todo.list)
  const word = useAppSelector(state => state.todo.word)
  const nowShowing = useAppSelector(state => state.todo.nowShowing)
  const dispatch = useDispatch()

  const shownTodoList = todoList.filter(todo => {
    switch (nowShowing) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  useEffect(() => {
    dispatch(saveLocal())
  }, [todoList])
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={e => {
              if (e.key !== 'Enter') {
                return
              }
              dispatch(addTodo())
            }}
            onChange={e => dispatch(wordChange(e.target.value))}
            value={word}
          />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {shownTodoList.map(item => (
              <TodoItem
                key={item.id}
                {...item}
                toggleChange={() => dispatch(toggleTodoItem(item.id))}
                onEdit={() => setEditing(item.id)}
                editing={editing === item.id}
                onSave={text => {
                  dispatch(
                    saveTodo({
                      id: item.id,
                      text: text,
                    })
                  )
                  setEditing(null)
                }}
                onDelete={() => dispatch(deleteTodo(item.id))}
              />
            ))}
          </ul>
        </section>
        <Tabbar />
      </section>
      <Footer />
    </>
  )
}

export default App
