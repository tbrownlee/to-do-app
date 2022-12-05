import React, { useState } from 'react';

import Header from './components/header.js';

import moon from './images/icon-moon.svg';
import sun from './images/icon-sun.svg';

import TodoList from './components/todo-list';
import Status from './components/status.js';


let initalTodos = [
    {
        text: "Complete online JavaScript course",
        checked: true,
        id: Math.random(),
    },
    {
        text: 'Jog around the park 3x',
        checked: false,
        id: Math.random(),
    },
    {
        text: '10 minutes meditation',
        checked: false,
        id: Math.random(),
    },
    {
        text: 'Read for 1 hour',
        checked: false,
        id: Math.random(),
    },
    {
        text: 'Pick up groceries',
        checked: false,
        id: Math.random(),
    },
    {
        text: 'Complete Todo App on Frontend Mentor',
        checked: false,
        id: Math.random(),
    }
];





function App() {
    /* State */
    const [todos, setTodos] = useState(initalTodos);

    const [mobileVisible, setMobileVisible] = useState(isMobile() ? true : false);
    const [desktopVisible, setDesktopVisible] = useState(isDesktop() ? true : false);

    const [lightTheme, setLightTheme] = useState(true);

    const [todosLeft, setTodosLeft] = useState(todos.filter(todo => !todo.checked).length);

    const [display, setDisplay] = useState('all');
    const [active, setActive] = useState([]);
    const [completed, setCompleted] = useState([]);



    function updateCheckedNum() {
        setTodosLeft(() => {
            return todos.filter(todo => !todo.checked).length;
        })

        setCompleted(() => {
            return todos.filter(todo => todo.checked);
        })

        setActive(() => {
            return todos.filter(todo => !todo.checked);
        })
    }

    

    /* Functions to change display */
    function allClick() {
        setDisplay('all');
    }

    function activeClick() {
        setActive(() => {
            return todos.filter(todo => !todo.checked);
        })

        setDisplay('active');
    }

    function completedClick() {
        setCompleted(() => {
            return todos.filter(todo => todo.checked);
        })

        setDisplay('completed');
    }

    /* Returns display */
    function returnDisplay() {
        if (display == 'all') {
            return todos;
        } else if (display == 'active') {
            return active;
        } else if (display == 'completed') {
            return completed;
        }
    }



    /* Functions to check window size */
    function isMobile() {
        return window.innerWidth < 865;
    }

    function isDesktop() {
        return window.innerWidth > 865;
    }

    /* Set mobile state if mobile, detoggles if desktop. Vice versa for desktop */
    React.useEffect(() => {
        function handleResize() {
            if (isMobile()) {
                setMobileVisible(true);
                setDesktopVisible(false);
            } else if (isDesktop()) {
                setMobileVisible(false);
                setDesktopVisible(true);
            }
        }

        window.addEventListener('resize', handleResize);
    })



    /* Adds input to todoList */
    function handleEnterPress(e) {
        if (e.key === 'Enter') {
            let text = e.currentTarget.value;

            if (text === '') {
                return;
            }

            setTodos(() => {
                return [...todos, { text: text, id: Math.random(), checked: false }];
            })

            setTodosLeft(previous => {
                return previous + 1;
            })

            e.currentTarget.value = '';
        }
    }

    function deleteTodo(id) {
        setTodos(previous => {
            return previous.filter(todo => todo.id != id);
        });

        setTodosLeft(() => {
            return todos.filter(todo => todo.checked ? '' : todo.id != id).length;
        });

        setCompleted(previous => {
            return previous.filter(todo => todo.id != id);
        });

        setActive(previous => {
            return previous.filter(todo => todo.id != id);
        });
    }

    function planetClick() {
        setLightTheme(!lightTheme);
    }

    function clearCompleted() {
        setTodos(todos.filter(todo => !todo.checked));

        setCompleted(completed.filter(todo => !todo.checked));

        setTodosLeft(todos.filter(todo => !todo.checked).length);
    }



    function reload() {
        window.location.reload();
    }

    document.title = 'To Do App';



    return (
        <div className={`body ${lightTheme ? '' : 'dark'}`}>
            <Header lightTheme={lightTheme} />
            <main className='main'>
                <header className='main__header'>
                    <h1 className='main__header__todo' onClick={reload}>TODO</h1>
                    <button className='main__header__button'>
                        <img className='main__header__button__icon-planet' src={lightTheme ? moon : sun} onClick={planetClick} />
                    </button>
                </header>
                <div className='main__todo-input'>
                    <input className={`main__todo-input__input ${lightTheme ? '' : 'dark'}`} placeholder='Create a new todo...' onKeyPress={handleEnterPress}></input>
                </div>
                <ul className={`main__todo-list ${lightTheme ? '' : 'dark'}`}>
                    <TodoList todos={returnDisplay()} deleteTodo={deleteTodo} lightTheme={lightTheme} updateCheckedNum={updateCheckedNum} />
                    <footer className='main__todo-list__footer'>
                        <p className='main__todo-list__footer__remainder'>{todosLeft} items left</p>
                        {desktopVisible && <Status class='desktop' lightTheme={lightTheme} display={display} allClick={allClick} activeClick={activeClick} completedClick={completedClick} />}
                        <button className='main__todo-list__footer__clear' onClick={clearCompleted}>Clear Completed</button>
                    </footer>
                </ul>
                {mobileVisible && <Status class='mobile' lightTheme={lightTheme} display={display} allClick={allClick} activeClick={activeClick} completedClick={completedClick} />}
                {/* Drag and drop functionality is coming soon:
                    <p className={`main__instructions ${lightTheme ? '' : 'dark'}`}>Drag and drop to reorder list</p>
                */}
            </main>
        </div >
    )
}

export default App;