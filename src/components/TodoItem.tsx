import { ChangeEvent, FC, useState } from 'react'

interface Props {
  id: number
  text: string
  completed: boolean
  editing: boolean
  toggleChange: (id: number) => void
  onEdit: () => void
  onSave: (word: string) => void
  onDelete: () => void
}
const TodoItem: FC<Props> = props => {
  const { completed, text, toggleChange, id, onDelete, editing, onSave } = props
  const [word, setWord] = useState(text)
  function editTodo(e: ChangeEvent<HTMLInputElement>) {
    setWord(e.target.value)
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      onSave(word)
    }
  }
  return (
    <li className={[completed ? 'completed' : '', editing ? 'editing' : ''].join(' ')}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => toggleChange(id)}
        />
        <label onDoubleClick={() => props.onEdit()}>{text}</label>
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
