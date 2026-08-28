# Todo List App

A clean, modern, and responsive to-do list built with **pure HTML, CSS, and JavaScript** — no frameworks, no dependencies.

## ✨ Features

- ➕ Add tasks quickly (press `Enter` or click **Add**)
- ✅ Mark tasks as done / undo
- 🗑️ Delete single tasks
- 🧹 Clear all completed tasks at once
- 🔎 Filter by **All / Active / Done**
- 💾 Saves your tasks automatically in the browser (`localStorage`) — data survives page refresh
- 📱 Fully responsive: works on desktop, tablet, and mobile
- ♿ Accessible: keyboard-friendly, ARIA labels, focus states

## 🖥️ Live Demo

Open `index.html` in any modern browser. No server or install needed.

Or preview it locally:

```bash
# with Python
python -m http.server 8000
# then open http://localhost:8000

# with Node.js
npx serve .
```

## 🛠️ Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Markup   | Semantic HTML5          |
| Styling  | Modern CSS (variables, flexbox, animations, media queries) |
| Logic    | Vanilla JavaScript (ES6+, IIFE, strict mode) |

## 📁 Project Structure

```
todo-app/
├── index.html   # Page structure
├── style.css    # All styling (modern UI)
└── script.js    # App logic (add, toggle, delete, filter, save)
```

## 🔧 How It Works

- Tasks are stored as JSON in `localStorage` under the key `todo-app-tasks`.
- The app uses **event delegation-free** approach with direct listeners for clarity.
- The UI re-renders from state — single source of truth, easy to extend.

## 🚀 Possible Extensions

Want to grow it? Easy to add:

- Drag & drop to reorder tasks
- Due dates and reminders
- Dark mode toggle
- Export / import tasks (JSON)
- Multi-list support

## 📄 License

MIT — free to use and modify.

---

*Built with ❤️ as a clean, dependency-free front-end example.*
