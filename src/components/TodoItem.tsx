import { ChangeEvent, KeyboardEvent, FC, useState } from 'react'

interface Props {
  id: number
  text: string
  completed: boolean
  editing: boolean
  toggleChange: (id: number) => void
  onEdit: () => void
  onSave: (word: string) => void
  onDelete: () => void
  // editTodo: (e: ChangeEvent<HTMLInputElement>, todo: Todo) => void
}
const TodoItem: FC<Props> = props => {
  const { completed, id, text, toggleChange, onSave, onDelete } = props
  const [word, setWord] = useState(text)
  function editTodo(e: ChangeEvent<HTMLInputElement>) {
    setWord(e.target.value)
  }
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      props.onSave(word)
    }
  }
  function handleEdit() {
    props.onEdit()
  }
  return (
    <li className={[completed ? 'completed' : '', props.editing ? 'editing' : ''].join(' ')}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => toggleChange(id)}
        />
        <label onDoubleClick={handleEdit}>{text}</label>
        <button className="destroy" onClick={onDelete}></button>
      </div>
      <input
        className="edit"
        value={word}
        onChange={e => editTodo(e)}
        onKeyDown={handleKeyDown}
        onBlur={() => onSave(word)}
      />
    </li>
  )
}

export default TodoItem
