const myLibrary = [];

function Book(title, author, year, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, year, pages, read) {
    const newBook = new Book(title, author, year, pages, read);
    
    myLibrary.push(newBook);
    return newBook;
}

function displayLibrary() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = '';

    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('data-id', book.id);

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;
        bookDiv.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = book.author;
        bookDiv.appendChild(bookAuthor);

        const bookYear = document.createElement('p');
        bookYear.textContent = book.year;
        bookDiv.appendChild(bookYear);

        const bookPages = document.createElement('p');
        bookPages.textContent = book.pages;
        bookDiv.appendChild(bookPages);

        const bookRead = document.createElement('p');
        bookRead.textContent = book.read ? 'Read' : 'Not Read';
        bookDiv.appendChild(bookRead);

        libraryDiv.appendChild(bookDiv);
    });
}

// Modal functionality and event listeners
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const bookForm = document.getElementById('bookForm');
const submitBtn = document.getElementById('submit-btn');

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, year, pages, read);
    displayLibrary();
    modal.style.display = 'none';
});

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});