import Footer from './components/Footer'
import TodoItem from './components/TodoItem'
import Tabbar from './components/Tabbar'
import reducer, { ActionType, initState } from './store'
import { ChangeEvent, createContext, useEffect, useReducer, useState } from 'react'
export const TodoContext = createContext({
  state: initState,
  dispatch: (value: ActionType) => {
    // no content
    console.log(value)
  },
})

function App() {
  const [editing, setEditing] = useState<number | null>(null)

  const [state, dispatch] = useReducer(reducer, initState)

  const shownTodoList = state.todoList.filter(todo => {
    switch (state.nowShowing) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'input',
      payload: e.target.value,
    })
  }
  function addTodo(e: React.KeyboardEvent) {
    if (e.key !== 'Enter') {
      return
    }
    dispatch({
      type: 'addTodo',
    })
  }
  function todoItemChange(id: number) {
    dispatch({
      type: 'todoStatusChange',
      payload: id,
    })
  }
  function deleteTodo(id: number) {
    dispatch({
      type: 'del',
      payload: id,
    })
  }
  function saveTodo(id: number, text: string) {
    dispatch({
      type: 'save',
      payload: {
        id,
        text,
      },
    })
    setEditing(null)
  }
  useEffect(() => {
    dispatch({
      type: 'localSave',
    })
  }, [state.todoList])

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={addTodo}
            onChange={e => handleChange(e)}
            value={state.word}
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
                toggleChange={todoItemChange}
                onEdit={() => setEditing(item.id)}
                editing={editing === item.id}
                onSave={text => saveTodo(item.id, text)}
                onDelete={() => deleteTodo(item.id)}
              />
            ))}
          </ul>
        </section>
        <Tabbar />
      </section>
      <Footer />
    </TodoContext.Provider>
  )
}

export default App
