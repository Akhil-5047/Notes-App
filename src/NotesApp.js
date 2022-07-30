import React, {useState, useEffect} from "react";
import styles from './NotesApp.module.css';
import Flex from '@react-css/flex';
import {MdDelete} from 'react-icons/md';

function NotesApp() {

    const [todoList, setTodoList] = useState([]);
    const [userInput, setUserInput] = useState('');

    const onAddTodo = () => {
        if(userInput) {
            const addedList = [...todoList];
            addedList.push({text: userInput, isChecked: false});
            setTodoList(addedList);
            setUserInput('');
        }
    };

    const handleChange = (index) => {
        let data = [...todoList];
        data[index].isChecked = !data[index].isChecked;
        setTodoList(data);
    }

    const onDeleteTodo = (index) => {
        const deletedList = [...todoList];
        deletedList.splice(index,1);
        setTodoList(deletedList);
    }

    const onSaveTodo = () => {
        localStorage.setItem("todoData", JSON.stringify(todoList));
    }

    useEffect(() => {
        const getTodoList = localStorage.getItem('todoData');
        if (getTodoList !== '' && getTodoList !== null) {
        return setTodoList(JSON.parse(getTodoList));
        }
        return setTodoList([]);
    }, []);

    return (
        <div className={styles.todosBgContainer}>
            <Flex column alignItemsCenter>
                <h1 className={styles.todosHeading}>Notes</h1>
                <h1 className={styles.createTaskHeading}>
                    Create <span className={styles.createTaskHeadingSubpart}>Note</span>
                </h1>
                <input type="text" className={styles.todoUserInput} placeholder="What needs to be done?"
                    onChange={e => setUserInput(e.target.value)} value={userInput}/>
                <button className={styles.button} onClick={() => onAddTodo()}>Add</button>
                <h1 className={styles.todoItemsHeading}>
                    My <span className={styles.todoItemsHeadingSubpart}>Notes</span>
                </h1>
                <div className={styles.todoItemsContainer}>
                    {todoList.map((todoItem, index) => (
                        <div className={styles.todoItemContainer} key={index}>
                            <Flex direction='row'>
                                <input type='checkbox' className={styles.checkboxInput} onChange={() => handleChange(index)} checked={todoItem.isChecked}/>
                                <Flex direction='row' className={styles.labelContainer} justifySpaceBetween>
                                    {todoItem.isChecked ? 
                                        <p className={styles.todoText} style={{textDecoration: 'line-through'}}>{todoItem.text}</p> : 
                                        <p className={styles.todoText}>{todoItem.text}</p>
                                    }
                                    <div className={styles.deleteIconContainer}> 
                                        <MdDelete className={styles.deleteIcon} onClick={() => onDeleteTodo(index)}/>
                                    </div>
                                </Flex>
                            </Flex>
                        </div>
                    ))}
                </div>
                <button className={styles.button} onClick={() => onSaveTodo()}>Save</button>
            </Flex>
        </div>
  );
}

export default NotesApp;
