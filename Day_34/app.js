import { client } from "./clients.js";
const todoWrapper = document.querySelector(".todo-wrapper");
const todoBlock = document.querySelector(".add-todo-block");
const btnSave = todoBlock.querySelector(".btn-save");
const btnCancel = todoBlock.querySelector(".btn-cancel");
const toDoList = document.querySelector(".to-do-list");
const btnAddTodo = todoWrapper.querySelector(".add-todo");
const inputAddTodo = todoBlock.querySelector("#add-todo-input");

var todos = [];

btnAddTodo.addEventListener("click", () => {
  todoBlock.style.display = "block";
});

btnCancel.addEventListener("click", () => {
  todoBlock.style.display = "none";
});
var cnt = 0;
const postTask = async(doName) => {
  const { response } = await client.post("/tasks", {
    "name": doName,
    "completed": false,
  });
}


btnSave.addEventListener("click", (e) => {
  todoBlock.style.display = "none";
  const doName = inputAddTodo.value.replace(/<>/g, "");
  if(doName) {
    postTask(doName);
    renderTodos();
    inputAddTodo.value = "";
  }
});


const renderTodos = async () => {
  const {data: tasks} = await client.get("/tasks");
  const html = tasks.map((todo) => {
    return `
        <div class="Todo" data-index="${todo.id}">
            <p class="${
              todo.completed ? "completed" : ""
            } name-todo">${todo.name}</p>
            <div>
              <button data-type="remove" class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
              <button data-type="update" class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
              <button data-type="completed" class="btn-completed"><i class="fa-solid fa-square-check"></i></button>  
            </div>
        </div>
        `;
    }).join("");
    toDoList.innerHTML = html;
}
const handleRemove = async (id) => {
  const { response } = await client.delete(`/tasks/${id}`);
  renderTodos();
};

const handleDelete = async (id) => {
  const { response } = await client.delete(`/tasks/${id}`);
};

const handleUpdate = async (id, doName) => {
  const { response } = await client.put(`/tasks/${id}`, 
  {
    name: doName,
    completed: false,
  });
  renderTodos();
}
const todoListCompleted = document.querySelector(".to-do-list-completed");

const handleCompleted = async(index) =>  {
  const {data: tasks} = await client.get("/tasks");
  const html = tasks
    .map((todo) => {
      if(+index === +todo.id) {
        return `
          <div class="Todo" data-index="${todo.id}">
              <p class="${todo.completed ? "completed" : ""} name-todo">${
          todo.name
        }</p>
              <div>
                <button data-type="remove" class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
                <button data-type="update" class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button data-type="completed" class="btn-completed"><i class="fa-solid fa-square-check"></i></button>  
              </div>
          </div>
          `;
      }
    })
    .join("");
  todoListCompleted.innerHTML += html;
}

toDoList.addEventListener("click", (e) => {
  var type;
  var todoEl;
  if(e.target.localName == "button") {
    type =  e.target.dataset.type;
    todoEl = e.target.parentElement.parentElement;
  } else if(e.target.localName == "i") {
    type =  e.target.parentElement.dataset.type;
    todoEl = e.target.parentElement.parentElement.parentElement;
  }
  var index = todoEl.dataset.index;
  if(type == "remove") {
    handleRemove(index);
  }

  if(type == "update") {
    todoBlock.style.display = "block";
    btnSave.addEventListener("click", (e)=> {
     
      handleDelete(index);
      handleUpdate(index, inputAddTodo.value);
    });
    
  }

   if (type == "completed") {
     todoEl = e.target.parentElement.parentElement;
     index = todoEl.dataset.index;
    console.log(index);
     handleCompleted(+index);
    
   }
});

const btnSearch = document.querySelector("#search");

btnSearch.addEventListener("input", (e)=> {
  const info = e.target.value.toLowerCase();
  const todoList = document.querySelectorAll(".Todo");
  todoList.forEach((todo) => {
    const name = todo.querySelector(".name-todo").textContent.toLowerCase();
    if(name.indexOf(info) === -1) {
      todo.classList.add("hidden");
    } else {
      todo.classList.remove("hidden");
    }
  });
})