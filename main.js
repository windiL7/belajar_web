function addTask() {
    let input = document.getElementById('taskInput')
    let taskText = input.value.trim();

    if(!taskText){
        return;
    }

    let li = document.createElement('li');
    li.innerHTML = `<span onClick="toggleComplete(this)">${taskText}</span><button onClick="removeTask(this)"> X </button>`;
    document.getElementById('taskList').appendChild(li);

    input.value = '';
}

function removeTask(button) {
    button.parentElement.remove();
}

function toggleComplete(task) {
    task.classList.toggle('completed');
}