
function ToDoForm(props) {

    const [newTodoValue, setNewTodoValue] = React.useState('');

    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }
    const onCancel = () => {
        props.setOpenModal(false);
        let element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    }

    const onSubmit = (event) => {
        // stops the redirect
        event.preventDefault();
        props.addTodo(newTodoValue);
        props.setOpenModal(false);
        let element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Escribe tu nueva tarea</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder="Escribe el título de la tarea..."
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    onClick={onCancel}
                    className="TodoForm-button TodoForm-button--cancel"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="TodoForm-button TodoForm-button--add"
                >
                    Añadir
                </button>
            </div>
        </form>
    );

}

function countOfCompletedTasks(props) {
    let completed = 0
    props.toDosCounter.forEach(ToDo => {
        if (ToDo.completed === true) {
            completed += 1;
        }
    }
    )
    return completed
}

function ToDoCounter(props) {
    return (
        <h2 className="to-do-counter">Has completado <span> {countOfCompletedTasks(props)} </span> de <span> {props.toDosCounter.length} </span> tareas pendientes </h2>
    );
}

function ToDoItem(props) {

    return (
        <li className="ToDoItem">
            <span
                className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
                onClick={props.onComplete}
            >
                <i class="fas fa-check-square"></i>
            </span>
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
                {props.text}
            </p>
            <span
                className="Icon Icon-delete"
                onClick={props.onDelete}
            >
                <i class="far fa-trash-alt"></i>
            </span>
        </li>
    );
}

function ToDoList(props) {
    return (
        <section>
            <ul>
                {props.children}
            </ul>
        </section>
    );
}
function ToDoSearch({ searchValue, setSearchValue, text }) {
    const onSearchValueChange = (event) => {
        // console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    const onClickCloseSearch = (event) => {
        setSearchValue("");
    }

    return (
        <div className="search-container">
            <input
                className="TodoSearch"
                placeholder={text}
                value={searchValue}
                onChange={onSearchValueChange}
            />
            <i className="fas fa-window-close"
                onClick={onClickCloseSearch}
                ></i>
        </div>
    );
}

function Modal({ children }) {
    return ReactDOM.createPortal(
        <div className="ModalBackground">
            {children}
        </div>,
        document.getElementById('modal')
    );
}

function CreateToDoButton(props) {
    const onClickButton = () => {
        props.setOpenModal(prevState => !prevState);
        let element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    };

    return (
        <button
            className="CreateTodoButton"
            onClick={onClickButton}
        >
            +
        </button>
    );
}

// const defaultToDos = [
//     { text: 'Programar Flags Sale Event', completed: true },
//     { text: 'Flags Bancolombia Carrousel', completed: true },
//     { text: 'Ajustar estilos del menú de departamentos', completed: false },
//     { text: 'Ajustar estilos de la landing principal', completed: false },
//     { text: 'Agregar filtro de precios', completed: true },
// ];

function useLocalStorage(itemName, initialValue) {
    const localStorageItem = localStorage.getItem(itemName);
    let parsedItem;

    if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
    } else {
        parsedItem = JSON.parse(localStorageItem);
    }

    const [item, setItem] = React.useState(parsedItem);

    const saveItem = (newItem) => {
        const stringifiedItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifiedItem);
        setItem(newItem);
    };

    return [
        item,
        saveItem,
    ];
}

function App() {
    const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

    let searchedTodos = [];

    if (!searchValue.length >= 1) {
        searchedTodos = todos;
    } else {
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        });
    }

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            text
        })
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        if (newTodos[todoIndex].completed === true) {
            newTodos[todoIndex].completed = false;
        } else {
            newTodos[todoIndex].completed = true;
        }
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    return (
        <React.Fragment>

            <ToDoCounter toDosCounter={todos} />

            <ToDoSearch
                text="Ingresa un texto relacionado a tu busqueda..."
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            <ToDoList>
                {searchedTodos.map(ToDo => (
                    <ToDoItem
                        key={ToDo.text}
                        text={ToDo.text}
                        completed={ToDo.completed}
                        onComplete={() => completeTodo(ToDo.text)}
                        onDelete={() => deleteTodo(ToDo.text)} />
                ))}
            </ToDoList>

            {!!openModal && (
                <Modal>
                    <ToDoForm addTodo={addTodo} setOpenModal={setOpenModal} />
                </Modal>
            )}

            <CreateToDoButton
                setOpenModal={setOpenModal}
            />
        </React.Fragment>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);