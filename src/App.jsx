import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export default function App() {
  const [filteredData, setFilteredData] = useState("")
  const [val,setVal] = useState("all")

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })
  

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function updateTodo(id) {
    const newname = prompt("Enter new name for the todo")
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id && newname != "") {
          return { ...todo, title : newname }
        }

        return todo
      })
    }
    )
  }

  function filterTodos() {
    let filteredTodos = []
    
    filteredTodos = filteredData == "" ? [...todos] : todos.filter(todo => {
      return todo.title.includes(filteredData); 
    });

    if(val == "complete"){
      filteredTodos = filteredTodos.filter(todo => {
        return todo.completed == true; 
      });
    }

    else if(val == "incomplete"){
      filteredTodos = filteredTodos.filter(todo => {
        return todo.completed == false; 
      });
    }

    return filteredTodos
  }

  const filteredTodos = filterTodos()

  return (
    <>
    <div className="searchbar">
      <div>
      <input type="text" placeholder="Search..." onChange={(e) => {setFilteredData(e.target.value)}} id="" />
      </div>

      <div>
      <label htmlFor="">Apply Filter : </label>
      <select value={val} onChange={(e) => setVal(e.target.selectedOptions[0].value) }>
          <option value="all">Show All</option>
          <option value="complete">Completed</option>
          <option value="incomplete">Incompleted</option>
      </select>
      </div>

      </div>
      <br />
      <div><NewTodoForm onSubmit={addTodo} /></div>
      <div>
      <h1 className="header">Todo List</h1>
     
       <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} /> 
      </div>
    </>
  )
}
