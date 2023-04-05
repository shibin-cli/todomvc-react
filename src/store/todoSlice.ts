import { PayloadAction, createSlice } from '@reduxjs/toolkit'
const KEY = '__TOTO_MVC__'

export interface ITodoItem {
  id: number
  text: string
  completed: boolean
}
interface TodoState {
  word: string
  list: ITodoItem[]
  nowShowing: 'all' | 'active' | 'completed'
}
const initialState: TodoState = {
  word: '',
  list: getTodoList(),
  nowShowing: 'all',
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state) {
      state.list.unshift({
        id: Date.now(),
        text: state.word,
        completed: false,
      })
      state.word = ''
    },
    wordChange(state, action: PayloadAction<string>) {
      state.word = action.payload
    },
    toggleTodoItem(state, action: PayloadAction<number>) {
      const index = state.list.findIndex(item => item.id === action.payload)
      state.list[index].completed = !state.list[index].completed
    },
    deleteTodo(state, action: PayloadAction<number>) {
      const index = state.list.findIndex(item => item.id === action.payload)
      state.list.splice(index, 1)
    },
    saveTodo(state, action: PayloadAction<{ id: number; text: string }>) {
      const index = state.list.findIndex(item => item.id === action.payload.id)
      state.list[index].text = action.payload.text
    },
    clearCompleted(state) {
      state.list = state.list.filter(item => !item.completed)
    },
    hashchange(state) {
      const hash = window.location.hash.replace('#/', '')
      if (hash === 'all' || hash === 'active' || hash === 'completed') {
        state.nowShowing = hash
        return
      }
      state.nowShowing = 'all'
      window.location.hash && (window.location.hash = '')
    },
    saveLocal(state) {
      window.localStorage.setItem(KEY, JSON.stringify(state.list))
    },
  },
})
export const {
  addTodo,
  wordChange,
  toggleTodoItem,
  deleteTodo,
  saveTodo,
  clearCompleted,
  hashchange,
  saveLocal,
} = todoSlice.actions
function getTodoList(): ITodoItem[] {
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
export default todoSlice.reducer
