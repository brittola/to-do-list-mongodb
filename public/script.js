let inTask = document.getElementById('inTask');
let btAdd = document.getElementById('btAdd');
let outList = document.getElementById('outList');
let editScreen = document.querySelector('.editScreen');
let inEdit = document.getElementById('inEdit');
let btEdit = document.getElementById('btEdit');
let EditId = '';

async function refresh() {

    await fetch('http://localhost:3000/tasks/all')
        .then(res => {
            return res.json();
        }).then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                outList.innerHTML = '';
                data.forEach(task => {
                    outList.innerHTML += `
                    <div id="${task._id}" class="task">
                        <p onclick="checkTask(event)">${task.task}</p>
                        <button onclick="openEditScreen(event)">/</button>
                        <button onclick="removeTask(event)">X</button>
                    </div>
                    `
                });

                let tasks = outList.querySelectorAll('div p');
                let tasksDiv = outList.querySelectorAll('div');

                for (i in data) {
                    if (data[i].checked) {
                        tasks[i].classList.add('checked');
                        tasksDiv[i].style.backgroundColor = 'gray';
                    }
                }
            }
        });

}

async function addTask() {

    if (inTask.value == '') {
        inTask.focus();
        return;
    }

    const options = {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ task: inTask.value })
    };

    await fetch('http://localhost:3000/tasks/new', options)
        .then(res => {
            return res.json();
        }).then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                inTask.value = '';
                inTask.focus();
                refresh();
            }
        });
}

async function checkTask(event) {

    let id = event.target.parentElement.id;

    const options = {
        method: 'PUT'
    }

    await fetch('http://localhost:3000/tasks/check/' + id, options)
        .then(res => {
            return res.json();
        }).then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                refresh();
            }
        });

}

function openEditScreen(event) {

    editScreen.style.display = 'flex';
    inEdit.value = event.target.parentElement.querySelector('p').textContent;
    inEdit.focus();
    EditId = event.target.parentElement.id;

}

async function confirmEdit() {

    if (inEdit.value == '') {
        editScreen.style.display = 'none';
        inTask.focus();
        return;
    }

    const options = {
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ id: EditId, newText: inEdit.value })
    }

    await fetch('http://localhost:3000/tasks/edit', options)
        .then(res => {
            return res.json();
        }).then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                refresh();
                editScreen.style.display = 'none';
                inTask.focus();
            }
        });

}

async function removeTask(event) {

    let id = event.target.parentElement.id;

    const options = {
        method: 'DELETE'
    }

    await fetch('http://localhost:3000/tasks/remove/' + id, options)
        .then(res => {
            return res.json();
        }).then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                refresh();
            }
        });

}

btAdd.addEventListener('click', addTask);
inTask.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
btEdit.addEventListener('click', confirmEdit);
inEdit.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        confirmEdit();
    }
})

refresh();