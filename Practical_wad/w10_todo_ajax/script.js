window.onload = loadTasks;
function loadTasks() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/tasks", true);

    xhr.onload = function () {
        let tasks = JSON.parse(xhr.responseText);
        let list = document.getElementById("list");
        list.innerHTML = "";

        tasks.forEach((task, index) => {
            list.innerHTML += `
                <li>
                    ${task}
                            <button onclick="editTask(${index}, '${task}')">✏️</button>

                    <button onclick="deleteTask(${index})">❌</button>
                </li>
            `;
        });
    };

    xhr.send();
}

//add task
function addTask() {
    let task = document.getElementById("task").value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/tasks", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        loadTasks();
    }
    xhr.send(JSON.stringify({task :task}));

};

//Delete task
function deleteTask(index) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `http://localhost:3000/tasks/${index}`, true);
    xhr.onload = function () {
        loadTasks();
    };
    xhr.send();
}
function editTask(index, oldTask) {
    let newTask = prompt("Edit task:", oldTask);

    if (newTask === null || newTask === "") return;

    let xhr = new XMLHttpRequest();

    xhr.open("PUT", `http://localhost:3000/tasks/${index}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        loadTasks(); // refresh list
    };

    xhr.send(JSON.stringify({ task: newTask }));
}