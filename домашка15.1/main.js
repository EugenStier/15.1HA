const createTodoForm = document.getElementById("create-todo-form");
const listBox = document.querySelector(".todolist__list");
const todos = JSON.parse(localStorage.getItem("todos")) || [];

const createElem = (tag, className, text = "") => {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
};

const searchInput = document.querySelector(".top__search-input");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredTodos = todos.filter((todo) => {
    return todo.text.toLowerCase().includes(searchTerm);
  });
  displayTodos(filteredTodos);
});

const title = document.querySelector(".title");

function updateDayOfWeek() {
  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const today = new Date().getDay();
  const dayOfWeek = daysOfWeek[today];
  title.textContent = dayOfWeek;
}

updateDayOfWeek();

const subtitle = document.querySelector(".subtitle");

function updateDateTime() {
  const newDateTime = formatTime(new Date());
  subtitle.textContent = newDateTime;
}

function formatTime(dateTime) {
  const date = new Date(dateTime);
  const monthes =
    "января, февраля, марта, апреля, мая, июня, июля, августа, сентября, октября, ноября, декабря".split(
      ", "
    );
  const monthStr = monthes[date.getMonth()];
  const year = date.getFullYear();
  return `${date.getDate()} ${monthStr} ${year}.`;
}
setInterval(updateDateTime, 1000);

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const monthes =
    "января, февраля, марта, апреля, мая, июня, июля, августа, сентября, октября, ноября, декабря".split(
      ", "
    );
  const monthStr = monthes[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${date.getDate()} ${monthStr}, ${hours}:${minutes}`;
};

const createTodoElement = (todo) => {
  const li = createElem("li", "todolist__list-item");
  const checkbox = createElem("input", "todolist__list-checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isDone;
  checkbox.addEventListener("change", () => {
    todo.isDone = checkbox.checked;
    localStorage.setItem("todos", JSON.stringify(todos));
  });
  const div = createElem("div", "todolist__list-item-content");
  const time = createElem(
    "time",
    "todolist__list-item-time",
    formatDate(todo.time)
  );
  const text = createElem("p", "todolist__list-item-text", todo.text);
  div.append(time, text);
  li.append(checkbox, div);
  return li;
};

const renderTodos = () => {
  todos.forEach((todo) => {
    const li = createTodoElement(todo);
    listBox.prepend(li);
  });
};

const resetValidationStyles = () => {
  document.querySelectorAll(".new-todo__validation-box").forEach((elem) => {
    elem.style.display = "none";
  });
  document.querySelectorAll(".new-todo__input--error").forEach((elem) => {
    elem.classList.remove("new-todo__input--error");
  });
};

createTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = {
    text: e.target.elements.todoDesc.value,
    time: e.target.elements.todoTime.value,
  };

  if (!newTodo.text) {
    e.target.elements.todoDesc.classList.add("new-todo__input--error");
    const textValidBox = document.querySelector(
      ".new-todo__desc-validation-box"
    );
    textValidBox.style.display = "block";
    textValidBox.textContent = "Поле обязательно";
    return;
  }
  if (!newTodo.time) {
    e.target.elements.todoTime.classList.add("new-todo__input--error");
    const textValidBox = document.querySelector(
      ".new-todo__time-validation-box"
    );
    textValidBox.style.display = "block";
    textValidBox.textContent = "Поле обязательно";
    return;
  }
  resetValidationStyles();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));

  const newTodoElement = createTodoElement(newTodo);
  listBox.prepend(newTodoElement);
  e.target.reset();
});

renderTodos();

const allBtn = document.querySelector(".todolist__filters-btn--active");
allBtn.addEventListener("click", () => {
  setActiveButton(allBtn);
  displayTodos(todos);
});

const activeBtn = document.querySelector(".todolist__filters-btn--active222");
activeBtn.addEventListener("click", () => {
  setActiveButton(activeBtn);
  const activeTodos = todos.filter((todo) => !todo.isDone);
  displayTodos(activeTodos);
});

const completedBtn = document.querySelector(
  ".todolist__filters-btn--active333"
);
completedBtn.addEventListener("click", () => {
  setActiveButton(completedBtn);
  const completedTodos = todos.filter((todo) => todo.isDone);
  displayTodos(completedTodos);
});

const setActiveButton = (button) => {
  document.querySelectorAll(".todolist__filters-btn").forEach((btn) => {
    btn.classList.remove("todolist__filters-btn--active");
  });
  button.classList.add("todolist__filters-btn--active");
};

const displayTodos = (todosArray) => {
  listBox.innerHTML = "";

  todosArray.forEach((todo) => {
    const li = createTodoElement(todo);
    listBox.appendChild(li);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};
