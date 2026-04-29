document.addEventListener("DOMContentLoaded", function () {
    if (isStorageExist()) {
        loadDataFromStorage()
    }

    const bookForm = document.getElementById("bookForm");
    bookForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    const searchBookForm = document.getElementById("searchBook");
    searchBookForm.addEventListener("submit", function (event) {
        event.preventDefault();
        searchBook();
    });
});

const books = [];
const RENDER_EVENT = "render-book";

document.addEventListener(RENDER_EVENT, function () {

    let renderBooks = [];

    if (isSearching) {
        renderBooks = filteredBooks;
    } else {
        renderBooks = books;
    }


    const incompleteBookList = document.getElementById("incompleteBookList");
    incompleteBookList.innerHTML = "";

    const completeBookList = document.getElementById("completeBookList");
    completeBookList.innerHTML = "";

    for (const bookItem of renderBooks) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete) {
            incompleteBookList.append(bookElement);
        } else {
            completeBookList.append(bookElement);
        }
    }
});

function generateId() {
    return Date.now();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year: Number(year),
        isComplete,
    };
}

function addBook() {
    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = document.getElementById("bookFormYear").value;
    const isComplete = document.getElementById("bookFormIsComplete").checked;

    if (editingBookId) {
        const bookObject = books.find((book) => book.id === editingBookId);
        bookObject.title = title;
        bookObject.author = author;
        bookObject.year = Number(year);
        bookObject.isComplete = isComplete;
        editingBookId = null;

        bookFormSubmit.innerText = "Masukkan Buku ke rak";
        formTitle.innerText = "Tambah Buku Baru";
    } else {
        const id = generateId();
        const bookObject = generateBookObject(id, title, author, year, isComplete);
        books.push(bookObject);
    }

    document.getElementById("bookForm").reset();

    searchBook();
    saveData();
}

function makeBook(bookObject) {
    const container = document.createElement("div");
    container.classList.add("bookItem");

    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("bookItemTitle");
    bookTitle.innerText = bookObject.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add('bookItemAuthor');
    bookAuthor.innerText = `Penulis: ${bookObject.author}`;

    const bookYear = document.createElement("p");
    bookYear.classList.add("bookItemYear");
    bookYear.innerText = `Tahun: ${bookObject.year}`;

    const buttonContainer = document.createElement("div");

    const isCompleteButton = document.createElement("button");
    isCompleteButton.classList.add("bookItemIsCompleteButton");

    isCompleteButton.innerText = bookObject.isComplete
        ? "Belum Selesai dibaca"
        : "Selesai dibaca";

    isCompleteButton.addEventListener('click', function () {
        toggleBookStatus(bookObject.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("bookItemDeleteButton");
    deleteButton.innerText = "Hapus buku";
    deleteButton.addEventListener('click', function () {
        deleteBook(bookObject.id);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("bookItemEditButton");
    editButton.innerText = "Edit buku";
    editButton.addEventListener('click', function () {
        editBook(bookObject.id);
    });

    buttonContainer.append(isCompleteButton, deleteButton, editButton);
    container.append(bookTitle, bookAuthor, bookYear, buttonContainer);
    return container;
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function toggleBookStatus(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    bookTarget.isComplete = !bookTarget.isComplete;

    searchBook();
    saveData();
}

function deleteBook(bookId) {
    const bookTarget = findBookIndex(bookId);
    if (bookTarget === -1) return;

    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (confirmDelete) {
        books.splice(bookTarget, 1);

        searchBook();
        saveData();
    }
}


const STORAGE_KEY = 'BOOKSHELF';

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
    }
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser Anda tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}


let filteredBooks = [];
let isSearching = false;
function searchBook() {
    const searchBookTitle = document.getElementById("searchBookTitle").value.toLowerCase();

    if (searchBookTitle === '') {
        isSearching = false;
    } else {
        isSearching = true;
        filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchBookTitle)
        );
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

let editingBookId = null;
function editBook(bookId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    bookFormSubmit.innerText = "Simpan Perubahan Buku";
    formTitle.innerText = "Edit Buku";

    const bookTarget = findBook(bookId);
    if (bookTarget === null) return;

    const title = document.getElementById("bookFormTitle");
    title.value = bookTarget.title;

    const author = document.getElementById("bookFormAuthor");
    author.value = bookTarget.author;

    const year = document.getElementById("bookFormYear");
    year.value = bookTarget.year;

    const isComplete = document.getElementById("bookFormIsComplete");
    isComplete.checked = bookTarget.isComplete;

    editingBookId = bookId;
}

const bookFormSubmit = document.getElementById("bookFormSubmit");
const formTitle = document.getElementById('formTitle');
