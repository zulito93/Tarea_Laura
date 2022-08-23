// Importamos la clase Tasks de tasks/Tasks.class.js:
import Tasks from "./Tasks.class.js";

//Creamos una función auto executable para inicializar la clase Tasks
(function (Tasks) {
  // Creamos una instancia de la clase Tasks
  const tasks = new Tasks();

  const taskInput = document.getElementById("task");
  const tasksList = document.getElementById("tasksList");
  const addTaskButton = document.getElementById("addTask");

  // Agregar un evento al input de tareas
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Agregar un evento al botón de agregar tarea
  addTaskButton.addEventListener("click", addTask);
  //Evento para clic en botones de tareas
  tasksList.addEventListener("click", e=>{
    btnAction(e);
  });

  function addTask() {
    const task = taskInput.value;
    if (task && taskExists(task)) {
      tasks.addTask(task);
      taskInput.value = ""; // Limpiar el input
      taskInput.placeholder = "¿Qué quieres hacer?"; // Cambiar el placeholder a la versión original
      taskInput.classList.remove("inputText--error"); // Eliminar la clase de error
    } else {
      taskInput.focus(); // Focus en el input
      taskInput.classList.add("inputText--error"); // Agregar clase de error
      taskInput.placeholder = "¡Agrega una tarea!"; // Cambiar el placeholder a la versión de error
    }
    showTasks();
  }

  // Verificar si la tarea ya existe
  function taskExists(activity) {
    const taskList = tasks.getTasks();
    const result = taskList.filter((task) => task.activity === activity);
    if (result.length) {
      showNotification("error", "La tarea ya existe");
      return false;
    }
    return true;
  }

  //Mostrar tareas
  function showTasks() {
    tasksList.classList.remove("tasksList");
    tasksList.innerHTML = ""; // Limpiar el contenido del elemento
    tasks.getTasks().forEach((value)=> {
        const li = document.createElement("li");
        li.innerHTML = ` 
        <span class="tasksItem${value.done ? " tasksItem--done" : ""}">${
            value.activity
          }</span>
        <span class="tasksItemAction">  
        <i id= "statusTask" data-id = "${value.id}" class="fa fa-check tasksItemAction-done ${
            value.done ? "hidden" : "" // Si la tarea está hecha, no mostrar el icono
          }"></i>
          <i id= "editTask" data-id = "${value.id}" class="fa fa-edit tasksItemAction-edit  ${
            value.done ? "hidden" : ""
          }"></i>
          </span>
        `;
        tasksList.appendChild(li); // Agregar el elemento al DOM
    });
  }

  // Mostrar notificaciones
  function showNotification(type, message) {
    alertify.set("notifier", "position", "top-right");
    alertify.notify(message, type);
  }

  //Enviar boton requerido a funcion
  const btnAction = e => {
    if (e.target.classList.contains('tasksItemAction-done')){
        tasks.editTask(e.target.dataset.id,"done",true);
    }
    if (e.target.classList.contains('tasksItemAction-edit')){
        const taskList = tasks.getTasks();
        const index = tasks.index(e.target.dataset.id);
        const activity = taskList[index].activity;

        alertify .prompt("Editar tarea", "Ingrese una tarea", activity,
        function (evt, value) {
          if ((value && value === activity) || !value) {
            showNotification("error", "No se ha editado la tarea");
            return false;
          }

          if (!taskExists(value)) {
            return false;
          }

          tasks.editTask(e.target.dataset.id, "activity", value);
          showNotification("success", "Actividad editada");
          showTasks();
        },
        null
        )
        .set("labels", { ok: "Editar", cancel: "Cancelar" });
    }

  }
})(Tasks);
