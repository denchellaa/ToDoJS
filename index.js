const input = document.querySelector('#input');
const button = document.querySelector('#btn');
const output = document.querySelector('#output');

let todoData = [];

const renderTodos = () => {
  output.innerHTML = '';

  todoData.forEach((el) => {
    const todo = `
      <div class="todo" data-id="${el.id}">
        <span class="text">${el.value}</span>
            <div class="icon-wrapper">
                  <div class="complete" data-complete="complete"></div>
                  <div class="trash" data-trash="trash"></div>
            </div>
      </div>
    `;
    output.innerHTML += todo;
  });
};
const addTodo = () => {
  todoData.push({ id: Date.now(), value: input.value });

  renderTodos();

  input.value = '';
};

const completeTodo = (event) => {
  const isComplete = event.target.dataset.complete = 'complete';

  if (isComplete) {
    event.target.classList.toggle('complete-done');

    const mainParentNode = event.target.closest('.todo');
    mainParentNode.classList.toggle('todo-complete');

    const text = document.querySelector('.text');
    text.classList.toggle('text-done');
  }
};

const trashTodo = (event) => {
  const isTrash = event.target.dataset.trash === 'trash';

  if (isTrash) {
    const mainParentNode = event.target.closest('.todo');

    const todoId = +mainParentNode.dataset.id;

    todoData = todoData.filter((el) => {
      if (el.id !== todoId) {
        return el;
      }
    });

    renderTodos();
  }
};

button.addEventListener('click', addTodo);

output.addEventListener('click', trashTodo);

output.addEventListener('click', completeTodo);
