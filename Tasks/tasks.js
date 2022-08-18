let tasks = [];
const taskInput = document.getElementById("task");
const tasksList = document.getElementById("tasksList");

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

function showNotification(type, message) {
  alertify.set("notifier", "position", "top-right");
  alertify.notify(message, type);
}


function taskExists(activity) {
  const result = tasks.filter((task) => task.activity === activity);
  if (result.length) {
    showNotification("error", "La tarea ya existe");
    return false;
  }
  return true;
}


function addTask() {
  const task = taskInput.value;

  if (task && taskExists(task)) {
    tasksArray.push({
      id: tasksArray.length, // Tamaño del array
      activity: task,
      done: false,
    }); // agregar tarea a la colección de tareas
    taskInput.value = ""; // Limpiar el input
    taskInput.placeholder = "¿Qué quieres hacer?"; // Cambiar el placeholder a la versión original
    taskInput.classList.remove("inputText--error"); // Eliminar la clase de error
    showTasks();
  } else {
    taskInput.focus(); // Focus en el input
    taskInput.classList.add("inputText--error"); // Agregar clase de error
    taskInput.placeholder = "¡Agrega una tarea!"; // Cambiar el placeholder a la versión de error
  }
}

function showTasks() {
    tasksList.classList.remove("tasksList");
    tasksList.innerHTML = "";

    if (tasks.length) {
        tasksList.setAttribute("class", "tasksList");
        tasks
          .sort((a, b) => a.done - b.done)
          .forEach((value) => {
            const li = document.createElement("li");
            li.innerHTML = ` 
            <span class="tasksItem${value.done ? " tasksItem--done" : ""}">${
              value.activity
            }</span>
          <span class="tasksItemAction">
          
            <i class="fa fa-check tasksItemAction-done ${
              value.done ? "hidden" : ""
            }"  onclick='statusTask(${value.done}, ${value.id})'></i>
            <i class="fa fa-edit tasksItemAction-edit  ${
              value.done ? "hidden" : ""
            }" onclick='editTask(${value.id})'></i>
            <i class="fa fa-trash-o tasksItemAction-delete" onclick='delTask(${
              value.id
            })'></i>
          </span>
          `;
            tasksList.appendChild(li);
          });
    }
}

function statusTask(status, id) {
    if (!status) {
        const index = tasks.findIndex((value)=> {
            return value.id === id;
        });
        tasks[index].done = true;
        showTasks();
    }
}

function delTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  showTasks();
}

function editTask(id){
      const index = tasks.findIndex(function (value){
        return value.id === id;
      });
      alert(index);
      const activity = tasks[index].activity;
      alertify .prompt("Editar tarea", "Ingrese una tarea", activity,
      function (evt, value){
        if ((value && value === activity) || !value) {
          showNotification("error", "No se ha editado la tarea");
          return false;
        }
        if (!taskExists(value)) {
          return false;
        }

        tasks[index].activity = value;
        showNotification("success", "Actividad editada");
        showTasks();
      },
      null
      )
    .set("labels", {ok : "Editar", cancel: "Cancelar"});
}