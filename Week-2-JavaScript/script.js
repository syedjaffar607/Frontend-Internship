
const form = document.querySelector("#todo-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const message = document.querySelector("#message");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();
  if (taskText.length > 50) {
  message.textContent = "Task must be 50 characters or less.";
  return;
}

  if (taskText === "") {
    message.textContent = "Please enter a task first.";
    return;
  }

  tasks.push({
    
    text: taskText,
    completed: false
  });
  saveTasks();

  input.value = "";
  message.textContent = "Task added successfully!";
  renderTasks();
});

function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach(function (task, index) {
    const item = document.createElement("li");
    const text = document.createElement("span");
    const completeButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    text.textContent = task.text;
    completeButton.textContent = task.completed ? "Undo" : "Done";
    deleteButton.textContent = "Delete";

    if (task.completed) {
      item.classList.add("completed");
    }

    completeButton.addEventListener("click", function () {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      message.textContent = "Task deleted.";
      renderTasks();
    });
   

    item.append(text, completeButton, deleteButton);
    taskList.appendChild(item);
  });
  
}
 renderTasks();


const loadPostsButton = document.querySelector("#load-posts");
const postsContainer = document.querySelector("#posts");
const apiMessage = document.querySelector("#api-message");

loadPostsButton.addEventListener("click", async function () {
  apiMessage.textContent = "Loading posts...";
  postsContainer.replaceChildren();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts.");
    }

    const posts = await response.json();

    posts.forEach(function (post) {
      const card = document.createElement("article");
      const heading = document.createElement("h3");
      const paragraph = document.createElement("p");

      heading.textContent = post.title;
      paragraph.textContent = post.body;

      card.append(heading, paragraph);
      postsContainer.appendChild(card);
    });

    apiMessage.textContent = "Posts loaded successfully!";
  } catch (error) {
    apiMessage.textContent =
      "Unable to load posts. Please check your internet connection.";
  }
});

