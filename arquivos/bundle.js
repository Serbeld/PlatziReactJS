"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function countOfCompletedTasks(props) {
    var completed = 0;
    props.toDosCounter.forEach(function (ToDo) {
        if (ToDo.completed === true) {
            completed += 1;
        }
    });
    return completed;
}

function ToDoCounter(props) {
    return React.createElement(
        "h2",
        { className: "to-do-counter" },
        "Has completado ",
        React.createElement(
            "span",
            null,
            " ",
            countOfCompletedTasks(props),
            " "
        ),
        " de ",
        React.createElement(
            "span",
            null,
            " ",
            props.toDosCounter.length,
            " "
        ),
        " tareas pendientes "
    );
}

function ToDoItem(props) {

    return React.createElement(
        "li",
        { className: "ToDoItem" },
        React.createElement(
            "span",
            {
                className: "Icon Icon-check " + (props.completed && 'Icon-check--active'),
                onClick: props.onComplete
            },
            "\u221A"
        ),
        React.createElement(
            "p",
            { className: "TodoItem-p " + (props.completed && 'TodoItem-p--complete') },
            props.text
        ),
        React.createElement(
            "span",
            {
                className: "Icon Icon-delete",
                onClick: props.onDelete
            },
            "X"
        )
    );
}

function ToDoList(props) {
    return React.createElement(
        "section",
        null,
        React.createElement(
            "ul",
            null,
            props.children
        )
    );
}

function ToDoSearch(_ref) {
    var searchValue = _ref.searchValue,
        setSearchValue = _ref.setSearchValue,
        text = _ref.text;

    var onSearchValueChange = function onSearchValueChange(event) {
        // console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    return React.createElement("input", {
        className: "TodoSearch",
        placeholder: text,
        value: searchValue,
        onChange: onSearchValueChange
    });
}

function CreateToDoButton(props) {
    var onClickButton = function onClickButton(msg) {
        alert(msg);
    };

    return React.createElement(
        "button",
        {
            className: "CreateTodoButton",
            onClick: function onClick() {
                return onClickButton('Aquí se debería abrir el modal');
            }
        },
        "+"
    );
}

var defaultToDos = [{ text: 'Programar Flags Sale Event', completed: true }, { text: 'Flags Bancolombia Carrousel', completed: true }, { text: 'Ajustar estilos del menú de departamentos', completed: false }, { text: 'Ajustar estilos de la landing principal', completed: false }, { text: 'Agregar filtro de precios', completed: true }];

function App() {
    var _React$useState = React.useState(defaultToDos),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        toDos = _React$useState2[0],
        setToDo = _React$useState2[1];

    var _React$useState3 = React.useState(''),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        searchValue = _React$useState4[0],
        setSearchValue = _React$useState4[1];

    var searchedToDos = [];

    if (!searchValue.length >= 1) {
        searchedToDos = toDos;
    } else {
        searchedToDos = toDos.filter(function (todo) {
            var todoText = todo.text.toLowerCase();
            var searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        });
    }

    var completeTodo = function completeTodo(text) {
        var todoIndex = toDos.findIndex(function (todo) {
            return todo.text === text;
        });
        var newTodos = [].concat(_toConsumableArray(toDos));
        newTodos[todoIndex].completed = true;
        setToDo(newTodos);
    };

    var deleteTodo = function deleteTodo(text) {
        var todoIndex = toDos.findIndex(function (todo) {
            return todo.text === text;
        });
        var newTodos = [].concat(_toConsumableArray(toDos));
        newTodos.splice(todoIndex, 1);
        setToDo(newTodos);
    };

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(ToDoCounter, { toDosCounter: toDos }),
        React.createElement(ToDoSearch, {
            text: "Ingresa un texto relacionado a tu busqueda...",
            searchValue: searchValue,
            setSearchValue: setSearchValue
        }),
        React.createElement(
            ToDoList,
            null,
            searchedToDos.map(function (ToDo) {
                return React.createElement(ToDoItem, {
                    key: ToDo.text,
                    text: ToDo.text,
                    completed: ToDo.completed,
                    onComplete: function onComplete() {
                        return completeTodo(ToDo.text);
                    },
                    onDelete: function onDelete() {
                        return deleteTodo(ToDo.text);
                    } });
            })
        ),
        React.createElement(CreateToDoButton, null)
    );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));