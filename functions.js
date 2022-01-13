// creation of variables for relevant DOM elements
const grid = document.querySelector('.grid');

console.log(grid);


// Array for library and functions to create and add book

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

const W3 = new Book('Witcher 3', 'IDK', 283, 191);


console.log(HP);

addBookToLibrary(HP);

addBookToLibrary(SP);

addBookToLibrary(W3);



console.table(myLibrary);

function showLibrary(myLibrary) {
    while (grid.firstChild){
        grid.removeChild(grid.lastChild);
    }
    let index = 0;
    myLibrary.forEach(entry => {

        //creating bookCard
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
        bookCard.setAttribute('id', index);
        index ++;

        //creating top banner of bookCard, incl edit/remove buttons
        const bookEditRemove = document.createElement('div');
        bookEditRemove.classList.add('editRemoveBanner');

        const editBook = document.createElement('button');
        editBook.classList.add('editBtn')
        editBook.textContent = 'Edit';

        const removeBook = document.createElement('button');
        removeBook.classList.add('removeBtn')
        removeBook.textContent = 'Remove';


        //creating the info portion of the card
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('bookInfo');

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('cardTitle')
        cardTitle.textContent = entry.title;

        const cardAuthor = document.createElement('em');
        cardAuthor.textContent = entry.author;
        
        //creating the interactive part of the card (page controls)
        const pageControls = document.createElement('div');
        pageControls.classList.add('pageControls');

        const decrease = document.createElement('button')
        decrease.classList.add('decreaseBtn');
        decrease.textContent = '-';

        const allPages = document.createElement('button')
        allPages.classList.add('allPagesBtn');
        
        const increase = document.createElement('button');
        increase.classList.add('increaseBtn');
        increase.textContent = '+'

        //creating the pages/total pages
        const pageDisplay = document.createElement('div');
        pageDisplay.classList.add('pageDisplay');

        const currentPages = document.createElement('p');
        currentPages.textContent = entry.pagesRead;

        const divider = document.createElement('p');
        divider.textContent = '|';

        const totalPages = document.createElement('p');
        totalPages.textContent = entry.pages;




        bookEditRemove.appendChild(editBook);
        bookEditRemove.appendChild(removeBook); 
        bookCard.appendChild(bookEditRemove);

        bookInfo.appendChild(cardTitle);
        bookInfo.appendChild(cardAuthor);
        bookCard.appendChild(bookInfo);

        pageControls.appendChild(decrease);
        pageControls.appendChild(allPages);
        pageControls.appendChild(increase);
        bookCard.appendChild(pageControls);

        pageDisplay.appendChild(currentPages);
        pageDisplay.appendChild(divider);
        pageDisplay.appendChild(totalPages);
        bookCard.appendChild(pageDisplay);

        grid.appendChild(bookCard);

        createNewBookCard;
        
    });
    
    //Code for removal of books
    removeButtons = Array.from(document.querySelectorAll('.removeBtn'));
    removeButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            removeIndex = e.path[2].id;
            console.log(removeIndex);
            myLibrary.splice(removeIndex, 1);
            showLibrary(myLibrary);
    })
})
}



showLibrary(myLibrary);

createBook.addEventListener('click', () => {
    let title;
    let author;
    let pages;
    let pagesRead;
})

//creating the newbookCard 'Button'
function createNewBookCard () {
    const createBook = document.createElement('div');
    createBook.classList.add('createBook');
    const plusSymbol = document.createElement('h1');
    plusSymbol.textContent = '+';
    createBook.appendChild(plusSymbol);
    grid.appendChild(createBook);
}
