const input = document.querySelector('#input');
const button = document.querySelector('#btn');
const output = document.querySelector('#output');

const storageData = JSON.parse(localStorage.getItem('storageData'));
let todoData = storageData || [];

const renderTodos = () => {
  output.innerHTML = '';

  todoData.forEach((el) => {
    const todo = `
      <div class="todo ${el.isCompleted ? 'todo-complete' : ''}" data-id="${el.id}">
        <span class="text ${el.isCompleted ? 'text-done' : ''}">${el.value}</span>
            <div class="icon-wrapper">
                  <div class="complete ${el.isCompleted ? 'complete-done' : ''}" data-complete="complete">
                    ${el.isCompleted ? '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="17" fill="none"><path stroke="#fff" stroke-linecap="round" stroke-width="3" d="M23.743 1.743 10.95 14.536a1 1 0 0 1-1.414 0L2.479 7.479"/></svg>' : ''}
                        </div>
                  <div class="trash" data-trash="trash">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" fill="none"><path stroke="#fff" stroke-width="3" d="M1.731 4.318a2 2 0 0 1 1.998-2.09h10.542a2 2 0 0 1 1.998 2.09l-.637 14a2 2 0 0 1-1.998 1.91H4.366a2 2 0 0 1-1.998-1.91l-.637-14Z"/></svg>
                </div>
            </div>
      </div>
    `;
    output.innerHTML += todo;
  });
};
const addTodo = () => {
  todoData.push({ id: Date.now(), value: input.value, isCompleted: false });

  localStorage.setItem('storageData', JSON.stringify(todoData));

  renderTodos();

  input.value = '';
};

const completeTodo = (event) => {
  const isComplete = event.target.dataset.complete === 'complete';

  if (isComplete) {
    event.target.classList.toggle('complete-done');

    const mainParentNode = event.target.closest('.todo');
    mainParentNode.classList.toggle('todo-complete');

    const text = document.querySelector('.text');
    text.classList.toggle('text-done');

    if (event.target.classList.contains('complete-done')) {
      event.target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="17" fill="none"><path stroke="#fff" stroke-linecap="round" stroke-width="3" d="M23.743 1.743 10.95 14.536a1 1 0 0 1-1.414 0L2.479 7.479"/></svg>';
    } else {
      event.target.innerHTML = '';
    }
    const todoId = +mainParentNode.dataset.id;

    todoData = todoData.map((el) => {
      if (el.id === todoId) {
        return { ...el, isCompleted: !el.isCompleted };
      }
      return el;
    });

    localStorage.setItem('storageData', JSON.stringify(todoData));
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

renderTodos();
