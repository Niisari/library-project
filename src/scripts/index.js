const myLibrary = [];

function Book(title, author, year, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

function addBookToLibrary(title, author, year, read) {
    const newBook = new Book(title, author, year, read);
    
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