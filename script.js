
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const themeBtn = document.getElementById("toggle-theme");
const filterBtns = document.querySelectorAll(".filters button");


document.body.className = localStorage.getItem("theme") || "light";


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks("all");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    input.value = "";
    saveAndRender();
  }
});


themeBtn.addEventListener("click", () => {
  const current = document.body.classList.contains("dark") ? "light" : "dark";
  document.body.className = current;
  localStorage.setItem("theme", current);
});


filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    renderTasks(btn.dataset.filter);
  });
});


function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks("all");
}


function renderTasks(filter) {
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    if (
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed)
    ) {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = task.text;
      span.className = task.completed ? "completed" : "";
      span.onclick = () => {
        task.completed = !task.completed;
        saveAndRender();
      };

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => {
        tasks.splice(i, 1);
        saveAndRender();
      };

      li.appendChild(span);
      li.appendChild(delBtn);
      list.appendChild(li);
    }
  });
}
