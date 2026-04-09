# Todo List Application

A modern, fully-functional todo list application built with vanilla JavaScript, HTML, and CSS.

## Features

- ✅ **Add Tasks** - Quickly add new tasks to your list
- ✅ **Mark Complete** - Click the checkbox to mark tasks as complete
- ✅ **Delete Tasks** - Remove individual tasks with the delete button
- ✅ **Filter Tasks** - View all, active, or completed tasks
- ✅ **Persistent Storage** - Tasks are saved to browser's local storage
- ✅ **Task Counter** - See total number of tasks at a glance
- ✅ **Clear Completed** - Remove all completed tasks at once
- ✅ **Clear All** - Clear entire task list (with confirmation)
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Modern UI** - Beautiful gradient design with smooth animations

## File Structure

```
todo-app/
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── script.js       # Application logic
└── README.md       # Documentation (this file)
```

## Getting Started

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - No installation or build process required

2. **Add a Task**
   - Type your task in the input field
   - Click "Add Task" or press Enter
   - The task will appear in your list

3. **Manage Tasks**
   - Click the checkbox to mark a task as complete
   - Click the "Delete" button to remove a task
   - Use the filter buttons to view specific tasks

4. **Clear Tasks**
   - "Clear Completed" - Removes all completed tasks
   - "Clear All" - Removes all tasks (requires confirmation)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Details

### HTML (index.html)
- Semantic HTML5 structure
- Accessible form elements
- Mobile-friendly meta tags

### CSS (styles.css)
- CSS Grid and Flexbox for layout
- Gradient backgrounds and animations
- Responsive design with media queries
- Custom scrollbar styling
- Smooth transitions and hover effects

### JavaScript (script.js)
- Object-oriented design with `TodoApp` class
- Local storage integration for data persistence
- Event delegation for efficient DOM handling
- HTML escaping for security
- Filter functionality
- Confirmation dialogs for destructive actions

## Features in Detail

### Local Storage
All tasks are automatically saved to your browser's local storage. Your tasks will persist even after:
- Closing the browser tab
- Closing the browser completely
- Restarting your computer

### Filtering
- **All** - View all tasks
- **Active** - View only incomplete tasks
- **Completed** - View only completed tasks

### Data Format
Tasks are stored as JSON objects with:
- `id` - Unique timestamp-based identifier
- `text` - Task description
- `completed` - Boolean completion status
- `createdAt` - ISO timestamp of creation

## Customization

### Change Colors
Edit the CSS gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Font
Modify the font-family in `styles.css`:
```css
font-family: 'Your Font Name', sans-serif;
```

### Add More Features
You can extend the `TodoApp` class to add:
- Due dates
- Task categories/tags
- Priority levels
- Edit functionality
- Export/Import tasks

## Performance

- Lightweight (~15KB total)
- No external dependencies
- Smooth animations using CSS transitions
- Efficient DOM updates
- Minimal memory footprint

## Accessibility

- Semantic HTML structure
- Proper form labels
- Keyboard navigation support
- Color-safe design
- Sufficient contrast ratios

## License

This is a free, open-source project. Feel free to use, modify, and distribute as needed.

## Support

For issues or suggestions, please check the code comments for implementation details or modify the source files to suit your needs.

---

**Happy Task Management!** 🎯
