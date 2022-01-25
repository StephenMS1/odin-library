// creation of variables for relevant DOM elements
const grid = document.querySelector('.grid');

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


addBookToLibrary(HP);

addBookToLibrary(SP);

addBookToLibrary(W3);


function showLibrary(myLibrary) {
    while (grid.firstChild){
        grid.removeChild(grid.lastChild);
    }
    let index = 0;
    myLibrary.forEach(entry => {

        //creating bookCard
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
        bookCard.setAttribute('id', `Index:${index}`);
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
        cardTitle.classList.add('cardTitle', 'accessInfo')
        cardTitle.textContent = entry.title;

        const cardAuthor = document.createElement('em');
        cardAuthor.classList.add('accessInfo');
        cardAuthor.textContent = entry.author;
        
        //creating the interactive part of the card (page controls)
        const pageControls = document.createElement('div');
        pageControls.classList.add('pageControls');

        const decrease = document.createElement('button')
        decrease.classList.add('decreaseBtn');
        decrease.textContent = '-';

        
        
        const increase = document.createElement('button');
        increase.classList.add('increaseBtn');
        increase.textContent = '+'

        //creating the pages/total pages
        const pageDisplay = document.createElement('div');
        pageDisplay.classList.add('pageDisplay');

        const currentPages = document.createElement('p');
        currentPages.classList.add('accessInfo');
        currentPages.classList.add('countCurrentPages');
        currentPages.textContent = entry.pagesRead;

        const divider = document.createElement('p');
        divider.textContent = '|';

        const totalPages = document.createElement('p');
        totalPages.classList.add('accessInfo');
        totalPages.classList.add('countTotalPages');
        totalPages.textContent = entry.pages;




        bookEditRemove.appendChild(editBook);
        bookEditRemove.appendChild(removeBook); 
        bookCard.appendChild(bookEditRemove);

        bookInfo.appendChild(cardTitle);
        bookInfo.appendChild(cardAuthor);
        bookCard.appendChild(bookInfo);

        pageControls.appendChild(decrease);
        pageControls.appendChild(increase);
        bookCard.appendChild(pageControls);

        pageDisplay.appendChild(currentPages);
        pageDisplay.appendChild(divider);
        pageDisplay.appendChild(totalPages);
        bookCard.appendChild(pageDisplay);

        grid.appendChild(bookCard);

        
        
    });
    
    //functions for repeated e.g. newbookCard or removebuttonEvents
    createNewBookCard();
    removeBookListeners();
    editListeners();
    pageCountListeners();
    updateInfoPane();
    
}


//function to start once pages loads
window.addEventListener('load', showLibrary(myLibrary));




//Code for removal of books
function removeBookListeners(){
    removeButtons = Array.from(document.querySelectorAll('.removeBtn'));
    removeButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            removeIndex = e.path[2].id;
            myLibrary.splice(removeIndex.slice(-1), 1);
            showLibrary(myLibrary);
        })
    })
}

//function for creating the newbookCard 'Button'
function createNewBookCard () {
    const createBook = document.createElement('div');
    createBook.classList.add('createBook');
    const plusSymbol = document.createElement('h1');
    plusSymbol.textContent = '+';
    createBook.appendChild(plusSymbol);
    grid.appendChild(createBook);

    createBook.addEventListener('click', showInputForm)
}

//functions to show or hide inputform
function showInputForm() {
    const inputForm = document.querySelector('.inputFormScreen');
    inputForm.style.display = 'flex';
}

function hideInputForm() {
    const inputForm = document.querySelector('.inputFormScreen');
    inputForm.style.display = 'none';
}

function showEditForm() {
    const editForm = document.querySelector('.editFormScreen');
    editForm.style.display = 'flex';
}

function hideEditForm() {
    const editForm = document.querySelector('.editFormScreen');
    editForm.style.display = 'none';
}

const closeInputForm = document.querySelector('.closeForm');
closeInputForm.addEventListener('click', function(e) {
    hideInputForm();
    let inputElements = e.path[2].querySelectorAll('input');
    for (let [instance, entry] of Object.entries(inputElements)) {
        entry.value = '';
    }
})



//function for adding the filled out form as a new book

const addNewBookToLibrary = document.querySelector('.addBook');
addNewBookToLibrary.addEventListener('click', function(e) {
    let inputFormArray = [];
    
    hideInputForm();
    
    let inputElements = e.path[2].querySelectorAll('input');
    

    for (let [instance, entry] of Object.entries(inputElements)) {
        inputFormArray.push(entry.value);
    }
        
    for (let [instance, entry] of Object.entries(inputElements)) {
        entry.value = '';
    }

    let NB = new Book(inputFormArray[0], inputFormArray[1], inputFormArray[2], inputFormArray[3]);
    addBookToLibrary(NB);
    showLibrary(myLibrary);
})


//function for editing book
function editListeners (){

    editButtons = Array.from(document.querySelectorAll('.editBtn'));

    editButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            showEditForm()
            
            //creating an index point for which card to change
            let indexForChange = e.path[2].id;
            
            

            //get information off the book that is being edited.
            let infoToFillForm = []
            let inputPopulators = e.path[2].querySelectorAll('.accessInfo');
            
            

            for (let [instance, entry] of Object.entries(inputPopulators)) {
                infoToFillForm.push(entry.textContent);
            }
            
            [infoToFillForm[2], infoToFillForm[3]] = [infoToFillForm[3], infoToFillForm[2]]
            

            //get the input fields of the edit form and fill with the relevant book info
            const editForm = document.querySelector('.editFormScreen').querySelectorAll('input');
            
            
            for (let [instance, entry] of Object.entries(editForm)){
                entry.value = infoToFillForm[instance];
            }

            //function to update library entry - run by update btn event listener
            function updateTheInfo(e) { 
                //get the newly entered information when update is clicked.
                let inputFormArray = [];

                let inputElements = e.path[2].querySelectorAll('input');
                

                for (let [instance, entry] of Object.entries(inputElements)) {
                    inputFormArray.push(entry.value)
                }
                
                let bookToChange = myLibrary[indexForChange.slice(-1)];

                let i = 0;

                for ([category, value] of Object.entries(bookToChange)) {
                    bookToChange[category] = inputFormArray[i];
                    i++;
                }

                
                hideEditForm();
                closeEdit.removeEventListener('click', updateTheInfo);
                showLibrary(myLibrary);
            }

            //listener on update that repopulates book values with the newly entered ones.
            const closeEdit = document.querySelector('.editFormScreen').querySelector('.addBook');
            closeEdit.addEventListener('click', updateTheInfo);

            
        })
    })
}

function decreasePages(e) {
    let pageNumberElement = e.path[2].querySelector('.countCurrentPages')
    let pageNumber = pageNumberElement.textContent;
    if (pageNumber > 0) {
        pageNumber -= 1;
    }
    pageNumberElement.textContent = pageNumber;
    let indexForChange = e.path[2].id;
    myLibrary[indexForChange.slice(-1)].pagesRead = pageNumber;
    updateInfoPane();
}

function increasePages(e) {
    let pageNumberElement = e.path[2].querySelector('.countCurrentPages');
    let totalPageNumber = e.path[2].querySelector('.countTotalPages').textContent;
    let pageNumber = Number(pageNumberElement.textContent);
    if (pageNumber < totalPageNumber){
        pageNumber +=1;
    }
    pageNumberElement.textContent = pageNumber;
    let indexForChange = e.path[2].id;
    myLibrary[indexForChange.slice(-1)].pagesRead = pageNumber;
    updateInfoPane();
}

function pageCountListeners() {
    let decreaseBtns = Array.from(document.querySelectorAll('.decreaseBtn'));
    decreaseBtns.forEach((button) => {
        button.addEventListener('click', decreasePages);
    })
    let increaseBtns = Array.from(document.querySelectorAll('.increaseBtn'));
    increaseBtns.forEach((button) => {
        button.addEventListener('click', increasePages);
    })
}

function updateInfoPane() {
    let informationPane = document.querySelectorAll('.info .line .number');
        
    let cumulativeInfo = [];
    let bookCount = myLibrary.length;
    let completedBookCount = 0;
    let totalPageCount = 0;
    let totalReadPageCount = 0;
    for (let bookIndex in myLibrary) {
        if (myLibrary[bookIndex].pages == myLibrary[bookIndex].pagesRead) {
            completedBookCount += 1;
        }
        totalPageCount += Number(myLibrary[bookIndex].pages);
        totalReadPageCount += Number(myLibrary[bookIndex].pagesRead);
    }
    cumulativeInfo.push(bookCount, completedBookCount, totalPageCount, totalReadPageCount);
    console.log(cumulativeInfo);
    
    for ([key, value] of Object.entries(informationPane)) {
        value.textContent = cumulativeInfo[key];
    }
}