import React, { useReducer, useState } from 'react'
import { Todo } from './Todo'

export const ACTIONS = {
	ADD_TODO: 'add-todo',
	TOGGLE_TODO: 'toggle-todo',
	DELETE_TODO: 'delete-todo',
}

function reducer(todos, action) {
	switch (action.type) {
		case ACTIONS.ADD_TODO:
			return [...todos, newTodo(action.payload.name)]
		case ACTIONS.TOGGLE_TODO:
			return todos.map((todo) => {
				if (todo.id === action.payload.id) {
					return { ...todo, complete: !todo.complete }
				}
				return todo
			})
		case ACTIONS.DELETE_TODO:
			return todos.filter((todo) => {
				return todo.id !== action.payload.id
			})

		default:
			return todos
	}
}

function newTodo(name) {
	return { id: Date.now(), name: name, complete: false }
}

function App() {
	const [todos, dispatch] = useReducer(reducer, [])
	const [name, setName] = useState('')

	function handleSubmit(e) {
		e.preventDefault()
		dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } })
		setName('')
	}

	console.log(todos)
	// const [count, setCount] = useState(0)

	// function increment() {
	// 	setCount((prevCount) => prevCount + 1)
	// }

	// function decrement() {
	// 	setCount((prevCount) => prevCount - 1)
	// }

	// function increment() {
	// 	dispatch({ type: ACTIONS.INCREMENT })
	// }

	// function decrement() {
	// 	dispatch({ type: ACTIONS.DECREMENT })
	// }

	return (
		<div className='App'>
			{/* <button onClick={decrement}>-</button>
			<span>{state.count}</span>
			<button onClick={increment}>+</button> */}
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</form>
			{todos.map((todo) => {
				return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
			})}
		</div>
	)
}

export default App
