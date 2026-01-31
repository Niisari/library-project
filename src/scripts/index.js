// ========== Library Data ==========
let myLibrary = [];

// Functional book creation
const createBook = (title, author, year, pages, read) => ({
    id: crypto.randomUUID(),
    title,
    author,
    year,
    pages,
    read
});

// Functional array operations
const addBook = (library, book) => [...library, book];
const removeBook = (library, bookId) => library.filter(book => book.id !== bookId);
const updateBook = (library, bookId, updatedData) =>
    library.map(book => book.id === bookId ? { ...book, ...updatedData } : book);

// ========== DOM Elements ==========
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const bookForm = document.getElementById('bookForm');
const libraryDiv = document.getElementById('library');

let editingBookId = null;

// ========== Display Library ==========
function displayLibrary() {
    libraryDiv.innerHTML = '';

    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('data-id', book.id);

        bookDiv.innerHTML = `
            <h3 class="book__title">${book.title}</h3>
            <p class="book__author">Author: ${book.author}</p>
            <p class="book__year">Year: ${book.year}</p>
            <p class="book__pages">Pages: ${book.pages}</p>
            <p class="book__status">Status: ${book.read ? 'Read ✅' : 'Not Read ❌'}</p>
            <button class="edit-btn">Edit ✏️</button>
            <button class="delete-btn">Delete 🗑️</button>
        `;

        libraryDiv.appendChild(bookDiv);

        // Delete
        bookDiv.querySelector('.delete-btn').addEventListener('click', () => {
            myLibrary = removeBook(myLibrary, book.id);
            saveLibrary();
            displayLibrary();
        });

        // Edit
        bookDiv.querySelector('.edit-btn').addEventListener('click', () => {
            openEditModal(book);
        });
    });
}

// ========== Modal Functions ==========
function openEditModal(book) {
    editingBookId = book.id;
    modal.style.display = 'block';

    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;
    document.getElementById('pages').value = book.pages;
    document.getElementById('read').checked = book.read;
}

openModalBtn.addEventListener('click', () => {
    editingBookId = null; // Reset for adding new book
    bookForm.reset();
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => modal.style.display = 'none');

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// ========== Form Submission ==========
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: document.getElementById('year').value,
        pages: document.getElementById('pages').value,
        read: document.getElementById('read').checked
    };

    if (editingBookId) {
        myLibrary = updateBook(myLibrary, editingBookId, bookData);
        editingBookId = null;
    } else {
        myLibrary = addBook(myLibrary, createBook(...Object.values(bookData)));
    }

    saveLibrary();
    displayLibrary();
    modal.style.display = 'none';
});

// ========== Local Storage ==========
function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibrary() {
    const libraryData = localStorage.getItem('myLibrary');
    if (libraryData) myLibrary = JSON.parse(libraryData);
    displayLibrary();
}

// Initialize
loadLibrary();
