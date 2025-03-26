document.addEventListener('DOMContentLoaded',loadTasks);

function addTask() {
    let input = document.getElementById('taskInput')
    let taskText = input.value.trim();

    if(!taskText){
        return;
    }

    let li = document.createElement('li');
    li.innerHTML = `<span onClick="toggleComplete(this)">${taskText}</span><button onClick="removeTask(this, '${taskText}')"> X </button>`;
    document.getElementById('taskList').appendChild(li);
    saveTask(taskText);
    input.value = '';
}

function removeTask(button, taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    button.parentElement.remove();
}

function toggleComplete(task) {
    task.classList.toggle('completed');
    updateTask(task);
}

function saveTask(taskText){
    let tasks = getTasksFromStorage();
    tasks.push({text: taskText, completed: false});
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Tasks: ', tasks);
}


function getTasksFromStorage() {
    let tasks = localStorage.getItem('tasks');
    try {
        tasks = JSON.parse(tasks) || [];
    } catch (error){
        tasks = [];
    }
    return tasks;
    
}
function loadTasks(){
    let tasks = getTasksFromStorage();
    tasks.forEach((task) => {
        let li = document.createElement('li');
        li.innerHTML = `<span class="${task.completed ? 'completed' : ''}"onClick="toggleComplete(this)">${task.text}</span><button onClick="removeTask(this, '${task.text}')"> X </button>`;
        document.getElementById('taskList').appendChild(li);
    });
}

function updateTask(taskText) {
    console.log('Updating Task :', taskText.innerHTML);
    let tasks = getTasksFromStorage();
    tasks.forEach((task) => {
        if(task.text === taskText.innerHTML){
            task.completed = !task.completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Tasks: ', tasks);
}