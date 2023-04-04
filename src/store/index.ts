import produce from 'immer'
const KEY = '__TOTO_MVC__'

export interface ITodoItem {
  id: number
  text: string
  completed: boolean
}

interface StateType {
  todoList: ITodoItem[]
  word: string
  nowShowing: string
}
export interface ActionType {
  type: string
  payload?: any
}
export const initState = {
  todoList: getTodoList(),
  word: '',
  nowShowing: '',
}
const reducer = produce((draft: StateType, action: ActionType) => {
  switch (action.type) {
    case 'input':
      draft.word = action.payload
      break
    case 'addTodo': {
      draft.todoList.unshift({
        id: Date.now(),
        text: draft.word,
        completed: false,
      })
      draft.word = ''
      break
    }

    case 'del': {
      const index = draft.todoList.findIndex(item => item.id === action.payload)
      draft.todoList.splice(index, 1)
      break
    }

    case 'todoStatusChange': {
      const index = draft.todoList.findIndex(item => item.id === action.payload)
      draft.todoList[index].completed = !draft.todoList[index].completed
      break
    }
    case 'save': {
      const index = draft.todoList.findIndex(item => item.id === action.payload.id)
      draft.todoList[index].text = action.payload.text
      break
    }
    case 'clearCompleted': {
      draft.todoList = draft.todoList.filter(todo => !todo.completed)
      break
    }
    case 'localSave': {
      window.localStorage.setItem(KEY, JSON.stringify(draft.todoList || []))
      break
    }
    case 'hashchange': {
      const hash = window.location.hash.replace('#/', '')
      if (hash === 'all' || hash === 'active' || hash === 'completed') {
        draft.nowShowing = hash
        return
      }
      draft.nowShowing = 'all'
      window.location.hash && (window.location.hash = '')
    }
  }
})
export function getTodoList(): ITodoItem[] {
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
export default reducer
