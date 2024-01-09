window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((savedTask) => {
        const task_el = createTaskElement(savedTask);
        list_el.appendChild(task_el);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        if (!task) {
            alert("Please fill out the task");
            return;
        }

        const task_el = createTaskElement(task);
        list_el.appendChild(task_el);

        // Save tasks to localStorage
        saveTasksToLocalStorage();

        input.value = "";
    });

    function createTaskElement(taskText) {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = taskText;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerText = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerText = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                // Save tasks to localStorage after editing
                saveTasksToLocalStorage();
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            // Save tasks to localStorage after deleting
            saveTasksToLocalStorage();
        });

        return task_el;
    }

    function saveTasksToLocalStorage() {
        const tasks = Array.from(list_el.children).map((task_el) => {
            return task_el.querySelector(".text").value;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
