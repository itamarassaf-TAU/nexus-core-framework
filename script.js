// Todo List Application
class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoListApp_todos';

        this.elements = {
            form: document.getElementById('todo-form'),
            input: document.getElementById('todo-input'),
            todoList: document.getElementById('todo-list'),
            taskCount: document.getElementById('task-count'),
            clearCompleted: document.getElementById('clear-completed'),
            clearAll: document.getElementById('clear-all'),
            filterBtns: document.querySelectorAll('.filter-btn'),
        };

        this.init();
    }

    init() {
        this.loadTodos();
        this.attachEventListeners();
        this.render();
    }

    attachEventListeners() {
        this.elements.form.addEventListener('submit', (e) => this.handleAddTodo(e));
        this.elements.clearCompleted.addEventListener('click', () => this.clearCompleted());
        this.elements.clearAll.addEventListener('click', () => this.clearAll());

        this.elements.filterBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });
    }

    handleAddTodo(e) {
        e.preventDefault();
        const text = this.elements.input.value.trim();

        if (text === '') {
            this.elements.input.focus();
            return;
        }

        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        this.todos.push(newTodo);
        this.elements.input.value = '';
        this.elements.input.focus();

        this.saveTodos();
        this.render();
    }

    handleTodoToggle(id) {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    handleDeleteTodo(id) {
        this.todos = this.todos.filter((t) => t.id !== id);
        this.saveTodos();
        this.render();
    }

    handleFilterChange(e) {
        this.elements.filterBtns.forEach((btn) => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.render();
    }

    clearCompleted() {
        const completedCount = this.todos.filter((t) => t.completed).length;

        if (completedCount === 0) {
            alert('No completed tasks to clear.');
            return;
        }

        if (confirm(`Clear ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter((t) => !t.completed);
            this.saveTodos();
            this.render();
        }
    }

    clearAll() {
        if (this.todos.length === 0) {
            alert('No tasks to clear.');
            return;
        }

        if (confirm('Clear all tasks? This cannot be undone.')) {
            this.todos = [];
            this.saveTodos();
            this.render();
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter((t) => !t.completed);
            case 'completed':
                return this.todos.filter((t) => t.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const filteredTodos = this.getFilteredTodos();

        this.updateTaskCount();
        this.renderTodoList(filteredTodos);
    }

    updateTaskCount() {
        this.elements.taskCount.textContent = this.todos.length;
    }

    renderTodoList(filteredTodos) {
        if (filteredTodos.length === 0) {
            this.elements.todoList.innerHTML =
                '<div class="empty-state"><p>No tasks here. Add one to get started!</p></div>';
            return;
        }

        this.elements.todoList.innerHTML = filteredTodos
            .map((todo) => this.createTodoElement(todo))
            .join('');

        this.attachTodoEventListeners();
    }

    createTodoElement(todo) {
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input
                    type="checkbox"
                    class="todo-checkbox"
                    ${todo.completed ? 'checked' : ''}
                    data-id="${todo.id}"
                >
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="btn-delete" data-id="${todo.id}">Delete</button>
            </div>
        `;
    }

    attachTodoEventListeners() {
        const checkboxes = this.elements.todoList.querySelectorAll('.todo-checkbox');
        const deleteButtons = this.elements.todoList.querySelectorAll('.btn-delete');

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', (e) => {
                this.handleTodoToggle(parseInt(e.target.dataset.id));
            });
        });

        deleteButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                this.handleDeleteTodo(parseInt(e.target.dataset.id));
            });
        });
    }

    saveTodos() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    }

    loadTodos() {
        const stored = localStorage.getItem(this.storageKey);
        this.todos = stored ? JSON.parse(stored) : [];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.__NEXUS_AUDIT_OK__ !== true) {
        document.body.innerHTML = `
            <div style="font-family: sans-serif; padding: 24px; max-width: 720px; margin: 40px auto;">
                <h2>Application blocked</h2>
                <p>
                    Missing or invalid <strong>security_audit.json</strong>.
                    The file must exist in this directory and include at least 5 args.
                </p>
            </div>
        `;
        return;
    }

    new TodoApp();
});
