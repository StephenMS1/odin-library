let myLibrary =[];

function Book(title, author, pages, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const HP = new Book('Harry Potter & the POA', 'J.k. Rowling', 486, 240);

const SP = new Book('Skulduggery Pleasant', 'Derek Landy', 275, 123);

console.log(HP);

addBookToLibrary(HP);

addBookToLibrary(SP);

console.table(myLibrary);

function showLibrary(myLibrary) {
    myLibrary.forEach(book => {
        const book = document.createElement('div');

        
    });
}