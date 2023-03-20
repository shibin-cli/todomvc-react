import { useState, type KeyboardEvent, ChangeEvent, useEffect } from 'react'
import produce from 'immer'
import Footer from './components/Footer'
import TodoItem from './components/TodoItem'
import Tabbar from './components/Tabbar'
const KEY = '__TOTO_MVC__'
function App() {
  const [todoList, setTodoList] = useState<Todo[]>(getTodoList())
  const [word, setWord] = useState('')
  const [editing, setEditing] = useState<number | null>(null)
  const [nowShowing, setNowShowing] = useState<'all' | 'active' | 'completed'>('all')
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setWord(e.target.value)
  }
  function getTodoList() {
    const localData = window.localStorage.getItem(KEY)
    if (localData) {
      try {
        const data = JSON.parse(localData)
        return data
      } catch (e) {
        console.log(e)
      }
    }
    return []
  }
  const onHashChange = () => {
    const hash = window.location.hash.replace('#/', '')
    if (hash === 'all' || hash === 'active' || hash === 'completed') {
      return setNowShowing(hash)
    }
    setNowShowing('all')
    window.location.hash && (window.location.hash = '')
  }
  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(todoList))
  }, [todoList])
  const activeCount = todoList.reduce((accum, todo) => {
    return todo.completed ? accum : accum + 1
  }, 0)
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
  function addTodo(e: KeyboardEvent) {
    if (e.key !== 'Enter') {
      return
    }
    setTodoList(
      produce(draft => {
        draft.unshift({
          id: Date.now(),
          text: word,
          completed: false,
        })
      })
    )
    setWord('')
  }
  function clearCompleted() {
    setTodoList(todoList.filter(todo => !todo.completed))
  }
  function todoItemChange(id: number) {
    const index = todoList.findIndex(item => item.id === id)
    setTodoList(
      produce(draft => {
        draft[index].completed = !draft[index].completed
      })
    )
  }
  function edit(todo: Todo) {
    setEditing(todo.id)
  }
  function saveTodo(id: number, text: string) {
    setTodoList(
      produce(draft => {
        const todo = draft.find(item => item.id === id)
        if (todo) todo.text = text
      })
    )
    setEditing(null)
  }
  function deleteTodo(id: number) {
    setTodoList(
      produce(draft => {
        const index = draft.findIndex(item => item.id === id)
        draft.splice(index, 1)
      })
    )
  }

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={addTodo}
            onChange={e => handleChange(e)}
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
                toggleChange={todoItemChange}
                onEdit={() => edit(item)}
                editing={editing === item.id}
                onSave={text => saveTodo(item.id, text)}
                onDelete={() => deleteTodo(item.id)}
              />
            ))}
          </ul>
        </section>
        <Tabbar activeCount={activeCount} nowShowing={nowShowing} clearCompleted={clearCompleted} />
      </section>
      <Footer />
    </>
  )
}

export default App
