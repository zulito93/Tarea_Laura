class Tasks {
  taskList = [];

  getTasks() {
    return this.taskList;
  }

  getTask(id) {
    return this.taskList.find((task) => task.id === id);
  }

  addTask(task) {
    //Code here
    if (task) {
      this.taskList.push({
        id: this.taskList.length, // Tamaño del array
        activity: task,
        done: false,
      }); // agregar tarea a la colección de tareas
    }
  }

  finishTask(status, id) {
    if (!status) {
        const index = this.taskList.findIndex((value)=> {
            return value.id == id;
        });
        this.taskList[index].done = true;
    }
}

  editTask(id, property, value) {
    this.taskList = this.taskList.map((task) => {
      if (task.id == id) {
        task[property] = value;
      }
      return task;
    });
  }

  deleteTask(id) {
    this.taskList = this.taskList.filter((task) => task.id !== id);
  }
}

export default Tasks;