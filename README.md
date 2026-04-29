# 📚 Bookshelf (Web-JS)

Bookshelf is a simple web-based book list management application. It allows users to keep track of books they are currently reading, books they have already finished, and manage that list with Edit, Delete, and Search features.

This project is built using **Vanilla JavaScript** with the **Web Storage API (LocalStorage)**, so book data will not be lost even when the browser is closed or refreshed.

## ✨ Key Features

- **Add New Book**: Enter book data including Title, Author, and Release Year.
- **Two Separate Shelves**: Categorize books into "Not Yet Finished" and "Finished Reading" shelves.
- **Move Between Shelves**: Move books from one shelf to another with a single button.
- **Edit Book**: Update information for a book already on the shelf.
- **Delete Book**: Remove a book from the shelf (with a safety confirmation pop-up).
- **Search Book**: Search for a specific book by Title.
- **Local Storage**: Data is safely stored in the browser's `localStorage`.
- **Dark Mode UI**: A modern, eye-friendly interface with a dark theme.

## 🛠️ Technologies Used

- **HTML5**: Semantic web page structure.
- **CSS3**: Styling with Custom Properties (Variables), Flexbox, and responsive design.
- **JavaScript**: DOM manipulation, Event Handling, and Application Logic.

## 🚀 How to Run

You don't need to install any dependencies or a special server to run this app. Simply follow these steps:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/amaradism/bookshelf-web-js.git
   ```
2. Open the project folder.
3. Double-click on the `index.html` file to open it in your browser of choice.

## 📁 Folder Structure

```
├── css/
│   └── style.css
├── js/
│   └── main.js
├── index.html
└── README.md
```

## 💡 Additional Notes

This project was created to practice fundamental JavaScript concepts such as CRUD (Create, Read, Update, Delete), array manipulation (e.g. `.filter()` and `.find()`), and client-side data persistence.
