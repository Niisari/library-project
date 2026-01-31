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