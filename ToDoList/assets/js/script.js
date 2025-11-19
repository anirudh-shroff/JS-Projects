let tasks = [];
let currentFilter = "all";
let taskList = document.getElementById("taskList");
let empty = document.getElementById("empty");
function setPriority(task) {
    let priority = task.taskPriority;
    switch (priority) {
        case "high":
            {
                return 0;
            }
        case "medium":
            {
                return 1;
            }
        case "low":
            {
                return 2;
            }
        default:
            {
                return -1;
            }

    }
}

function clearInp() {
    document.getElementById("taskHead").value = "";
    document.getElementById("taskDsc").value = ""
    document.getElementById("prioritySelect").value = ""
}

function deleteTask(id) {
    let idx = tasks.findIndex(t => t.taskID === id);
    if (idx === -1) {
        window.alert("No tasks found!");
        return;
    }
    tasks.splice(idx, 1);
    taskRender();
}

function taskRender() {
    let filteredTasks = tasks;

    if (currentFilter !== "all") {
        filteredTasks = tasks.filter(t => t.taskPriority === currentFilter);
    }

    if (!tasks.length) {
        empty.innerHTML = `
            <div class="empty">
                <h3 class="text-center">What's on your mind?</h3>
                <p class="text-center">Let's go get some work done</p>
            </div>
        `
        taskList.innerHTML = "";
        return;
    }
    empty.innerHTML = "";
    taskList.innerHTML = filteredTasks.map
        (t => `<div class="card priority-${t.taskPriority} m-2 w-25">
        <div class="card-header">
            ${t.taskPriority}
        </div>
            <div class="card-body">
                <h5 class="card-title">${t.taskHead}</h5>
                <p class="card-text">${t.taskDsc}</p>
                <button href="#" class="btn p-0 priority-${t.taskPriority}-bg" onclick="deleteTask(${t.taskID})">
                    <i class="ri-close-circle-fill"></i>
                </button>
            </div>
        </div>`).join("");
    clearInp();
}

document.getElementById("addBtn").addEventListener("click", () => {
    let taskHead = document.getElementById("taskHead").value;
    let taskDsc = document.getElementById("taskDsc").value;
    let taskPriority = document.getElementById("prioritySelect").value;

    if (!taskHead || !taskDsc || !taskPriority) {
        window.alert("Pleas fill the boxes first");
        return;
    } else {
        let task = {
            taskHead,
            taskDsc,
            taskID: Date.now(),
            taskPriority,
        }

        tasks.push(task);
        // console.log(tasks.map(t => `${t.taskDsc} - ${t.taskHead} - ID : ${t.taskID} taskPriority : ${t.taskPriority}`))
        tasks.sort((a, b) => setPriority(a) - setPriority(b));
        taskRender();
    }

})

function changeTaskPriority(e) {
    currentFilter = e.target.value;
    taskRender();
}

document.getElementById("filter").addEventListener("change", changeTaskPriority)