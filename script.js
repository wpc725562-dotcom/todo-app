/* ============================================
   Todo App - Logic
   Features:
   - Add / complete / delete tasks
   - Filter: all, active, completed
   - Persist data with localStorage
   - Task counter + clear completed
   ============================================ */

(() => {
  "use strict";

  // ---------- State ----------
  const STORAGE_KEY = "todo-app-tasks";

  /** @type {{id: string, text: string, done: boolean}[]} */
  let tasks = loadTasks();
  let currentFilter = "all"; // 'all' | 'active' | 'completed'

  // ---------- DOM references ----------
  const form = document.getElementById("add-form");
  const input = document.getElementById("task-input");
  const list = document.getElementById("task-list");
  const counter = document.getElementById("counter");
  const emptyState = document.getElementById("empty-state");
  const emptyStateText = document.getElementById("empty-state-text");
  const clearBtn = document.getElementById("clear-completed");
  const dateDisplay = document.getElementById("date-display");
  const tabs = document.querySelectorAll(".filters__tab");

  // ---------- Helpers ----------
  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function getVisibleTasks() {
    if (currentFilter === "active") return tasks.filter((t) => !t.done);
    if (currentFilter === "completed") return tasks.filter((t) => t.done);
    return tasks;
  }

  function remainingCount() {
    return tasks.filter((t) => !t.done).length;
  }

  function makeId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // ---------- Rendering ----------
  function render() {
    const visible = getVisibleTasks();
    list.innerHTML = "";

    visible.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task" + (task.done ? " task--done" : "");

      // checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task__checkbox";
      checkbox.checked = task.done;
      checkbox.setAttribute("aria-label", "Mark as done");
      checkbox.addEventListener("change", () => toggleTask(task.id));

      // text
      const span = document.createElement("span");
      span.className = "task__text";
      span.textContent = task.text;

      // delete button
      const delBtn = document.createElement("button");
      delBtn.className = "task__delete";
      delBtn.textContent = "✕";
      delBtn.setAttribute("aria-label", "Delete task");
      delBtn.addEventListener("click", () => deleteTask(task.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(delBtn);
      list.appendChild(li);
    });

    renderEmptyState(visible.length === 0);
    renderCounter();
  }

  function renderEmptyState(show) {
    if (show) {
      emptyState.classList.remove("hidden");
      if (tasks.length === 0) {
        emptyStateText.textContent = "No tasks yet. Add your first one!";
      } else if (currentFilter === "active") {
        emptyStateText.textContent = "Nothing left to do. 🎉";
      } else {
        emptyStateText.textContent = "No completed tasks yet.";
      }
    } else {
      emptyState.classList.add("hidden");
    }
  }

  function renderCounter() {
    const left = remainingCount();
    counter.textContent = left === 1 ? "1 task left" : `${left} tasks left`;
  }

  // ---------- Actions ----------
  function addTask(text) {
    const clean = text.trim();
    if (!clean) return;

    tasks.push({ id: makeId(), text: clean, done: false });
    saveTasks();
    render();
  }

  function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.done = !task.done;
      saveTasks();
      render();
    }
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter((t) => !t.done);
    saveTasks();
    render();
  }

  function setFilter(filter) {
    currentFilter = filter;
    tabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.filter === filter);
    });
    render();
  }

  // ---------- Events ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(input.value);
    input.value = "";
    input.focus();
  });

  clearBtn.addEventListener("click", clearCompleted);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setFilter(tab.dataset.filter));
  });

  // ---------- Init ----------
  function init() {
    // Show today's date, e.g. "Thursday, August 28"
    const now = new Date();
    dateDisplay.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    render();
    input.focus();
  }

  init();
})();
