const taskInput = document.querySelector("#task-input");
const submit = document.querySelector("#submit");
const taskArea = document.querySelector("#task-area")


// Load tasks from localStorage when the page loads
window.addEventListener("load", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((taskText) => {
    addTask(taskText);
  });
});

submit.addEventListener("click", ()=>{
  addTask();
})

taskInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) { // Check if Enter key (key code 13) is pressed
    addTask();
  }
});

function addTask() {
  if (taskInput.value) {
    let div = document.createElement("div");
    let task = document.createElement("span");
    let check = document.createElement("input");
    let deleteBtn = document.createElement("button");
    div.classList.add("task-div");
    check.type = "checkbox";
    check.classList.add("check");
    task.textContent = taskInput.value;
    task.classList.add("task");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      task.parentElement.parentElement.removeChild(task.parentElement);
      saveTasks();
    });

    taskArea.appendChild(div);
    div.appendChild(check);
    div.appendChild(task);
    div.appendChild(deleteBtn);
    taskInput.value = "";

    saveTasks();
  }
}

function saveTasks() {
  const tasks = Array.from(taskArea.querySelectorAll(".task")).map((task) => task.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}