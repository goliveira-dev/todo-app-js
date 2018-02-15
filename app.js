// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
	// DOM Loaded event
	document.addEventListener("DOMContentLoaded", getTasksFromLS);
	// Add task event
	form.addEventListener("submit", addTask);
	// Remove task event
	taskList.addEventListener("click", removeTask);
	// Clear task event
	clearBtn.addEventListener("click", clearTasks);
	// Filter tasks event
	filter.addEventListener("keyup", filterTasks);
}

// Add task
function addTask(e) {
	if (taskInput.value === "" || taskInput.value === " ") {
		alert("Add a task");
		return;
	}

	// Create li element
	const li = document.createElement("li");
	// Add a class to li
	li.className = "collection-item";
	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link element
	const link = document.createElement("a");
	// Add a class to link
	link.className = "delete-item secondary-content";
	// Add an icon
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Append the link to li
	li.appendChild(link);

	// Append li to ul
	taskList.appendChild(li);

	// Store in LS
	storeTaskInLS(taskInput.value);
	// Clear input
	taskInput.value = "";

	e.preventDefault();
}

// Remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are you sure?")) {
			e.target.parentElement.parentElement.remove();

			// Remove from Local Storage
			removeTaskFromLS(e.target.parentElement.parentElement);
		}
	}
}

// Clear tasks
function clearTasks() {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear from Local Storage
	clearTasksFromLS();
}

// Filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll(".collection-item").forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) !== -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}

//---------------------------
// Store Task in Local Storage
function storeTaskInLS(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}
	// Push the taskt to array
	tasks.push(task);
	// Store the array in LS
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get Task from Local Storage
function getTasksFromLS() {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	// Load every task
	tasks.forEach(function(task) {
		// Create li element
		const li = document.createElement("li");
		// Add a class to li
		li.className = "collection-item";
		// Create text node and append to li
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement("a");
		// Add a class to link
		link.className = "delete-item secondary-content";
		// Add an icon
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append the link to li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	});
}

// Remove task from Local Storage
function removeTaskFromLS(taskItem) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	// Delete the tasks from Local Storage
	tasks.forEach(function(task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});
	// Set the spliced array to Local Storage
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks from Local Storage
function clearTasksFromLS() {
	localStorage.clear();
}
