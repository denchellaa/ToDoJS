const input = document.querySelector('#input');
const button = document.querySelector('#btn');
const output = document.querySelector('#output');

const todoData = [];

const renderTodos = () => {
  output.innerHTML = '';

  todoData.forEach((el) => {
    const todo = `
      <div class="todo">
        <span class="text">${el.value}</span>
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

button.addEventListener('click', addTodo);
