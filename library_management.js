//1. Book Object Creation
function createBook(title, author, isbn) {
    return {
        title: title,
        author: author,
        isbn: isbn,
        checkedOut: false,
        checkoutCount: 0,
        dueDate: null,
        rating: [],
        averageraing: []
    };
}
//calling function createBook
const book1 = createBook("To Kill a Mockingbird", "Harper Lee", 123456789);
const book2 = createBook("1984", "George Orwell", 987654321);
const book3 = createBook("Brave New World", "Aldous Huxley", 456789123);
const book4 = createBook("World War", "Nick", 234567891);
const book5 = createBook("Taitanic", "Deo", 891685478);
const book6 = createBook("Amongus", "John", 234567891);

//-----------------------------------------------------------------------------------

// create an array to store the library books
const library = [];

//-----------------------------------------------------------------------------------

//2. Add Books to Library
function addBookToLibrary(book) {
    const existingBook = library.find((existingBook) => {
        return existingBook.isbn === book.isbn;
    });
    if (existingBook) {
        console.log(`A book with ISBN "${book.isbn}" already exists in the library.`);
    } else {
        library.push(book);
        console.log(`Book "${book.title}" has been added to the library.`);
    }
}
//calling function addBookToLibrary
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);
//library all   books 
console.table(library);


//-----------------------------------------------------------------------------------

//common function of find book in linrary by isbn number
function findBookByISBN(isbn) {
    return library.find(book => book.isbn === isbn);
}

//--------------------------------------------------------------------------------------------------

//3. checkout Book
const MAX_CHECKOUTS = 3;
function checkoutBook(isbn) {
    const book = findBookByISBN(isbn);
    if (book) {
        //check max checkouts
        if (book.checkoutCount < MAX_CHECKOUTS) {
            book.checkedOut = true;
            book.checkoutCount++;


            //add due date to the book
            const dueDate = new Date();
            dueDate.setDate(2); //set date 2 sptember
            // dueDate.setDate(dueDate.getDate() + 10) // for set due date to 10 days from now
            book.dueDate = dueDate;

            console.log(`Book with ISBN ${isbn} has been checked out. ${book.checkoutCount} times.`);
        }
        else {
            console.log(`Book "${book.isbn}" cannot be checked out. Maximum checkout limit reached.`);
        }

    } else {
        console.error(`Book with ISBN ${isbn} was not found.`);
    }
}
//calling function checkoutBook
checkoutBook(123456789);
checkoutBook(123456789);
checkoutBook(987654321);
checkoutBook(4567891); // book not found

console.table(library);

//----------------------------------------------------------------------------------------------

//4. Return Book
function returnBook(isbn) {
    const book = findBookByISBN(isbn);

    if (book) {
        book.checkedOut = false;
        console.log(`Book with ISBN ${isbn} has been returned.`);
    } else {
        console.error(`Book with ISBN ${isbn} was not found.`);
    }
}
//calling function returnBook
returnBook(123456789);
returnBook(3456789);
//library all   books
console.table(library);

//----------------------------------------------------------------------------------------

//5.search books by author or title
function searchbook(query) {
    const lowerquery = query.toLowerCase();

    const matchingBook = library.filter((book) => {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();
        return title.includes(lowerquery) || author.includes(lowerquery);
    });

    if (matchingBook.length >= 1) {
        return matchingBook;
    } else {
        console.error(`Book not found.`);
    }

}
searchbook('Har');
searchbook('world');


//----------------------------------------------------------------------------------------------

//6. display avilable books
function displayAvailableBooks() {
    const availableBooks = library.filter((book) => {
        return !book.checkedOut  //return avilable books as array
    });

    console.log("Available Books:");
    availableBooks.forEach(book => {
        console.log(`Title: ${book.title}, Author: ${book.author}`);
    });
}
displayAvailableBooks();
//------------------------------------------------------------------------------------

//7. diaplsy checkedout books
function displayCheckedOutBooks() {
    const checkedOutBooks = library.filter((book) => {
        return book.checkedOut //return checkedoutbooks as array
    });
    console.log("Checked Out Books:");
    checkedOutBooks.forEach(book => {
        console.log(`Title: ${book.title}, Author: ${book.author}`);
    });
}
displayCheckedOutBooks();


//--------------------------------------------------------------------------------------

//8.Rate Books Function
function rateBook(isbn, rating) {
    const book = findBookByISBN(isbn);;
    if (book) {
        if (rating >= 1 && rating <= 5) {
            book.rating.push(rating);
            console.log(`Book "${book.title}" has been rated ${rating} stars.`);
        } else {
            console.log("Invalid rating. Please provide a rating between 1 and 5.");
        }
    } else {
        console.log(`Book with ISBN "${isbn}" not found in the library.`);
    }
}
rateBook(123456789, 5);//[5]
rateBook(123456789, 2);//[5,2]
rateBook(123456789, 7);//invalid rating

rateBook(987654321, 1);//[1]

//library all   books
console.table(library);

//--------------------------------------------------------------------------------------------
//9.Calculate Average rate of book 
function averagerate() {
    library.map((book) => {
        if (book.rating.length > 0) {
            let totalRating = book.rating.reduce((sum, current) => {
                return sum += current;
            })
            let averageRating = totalRating / book.rating.length;
            console.log(`Average rating of "${book.title}"is ${averageRating.toFixed(1)}`);
            book.averageraing = Number(averageRating.toFixed(1));
        } else {
            book.averageraing = 0
        }
    })

}
averagerate();
console.table(library);



//--------------------------------------------------------------------------------------------

//10.function for list over due date books
function listOverdueBooks() {
    const currentDate = new Date();
    const overdueBooks = library.filter((book) => {
        return book.checkedOut && book.dueDate && book.dueDate < currentDate;
    });
    console.table(overdueBooks);
}
listOverdueBooks();

//--------------------------------------------------------------------------------------------

//11.function for save library items list in local storage
function saveLibrary() {
    try {
        localStorage.setItem("library", JSON.stringify(library));
        console.log("Library data saved to localStorage.");
    } catch (error) {
        console.error("Error saving library data to localStorage:", error);
    }
}
saveLibrary();

//--------------------------------------------------------------------------------------------

//12.function for load library from local storage
function loadLibrary() {
    try {
        const storedLibrary = localStorage.getItem("library");
        const parsedLibrary = JSON.parse(storedLibrary);
        library.length = 0; //clear books from library
        library.push(...parsedLibrary);
    } catch (error) {
        console.error("Error loading library data from localStorage:", error);
    }
}
loadLibrary();

//--------------------------------------------------------------------------------------------

//13.sort the library based on the provided criteria

function sortLibrary(criteria) {

    const sortbook = {
        title: (a, b) => a.title.localeCompare(b.title),
        author: (a, b) => a.author.localeCompare(b.author),
        averageRating: (a, b) => averagerate(b) - averagerate(a),
        checkoutCount: (a, b) => a.checkoutCount - b.checkoutCount,
        averagerating: (a, b) => b.averageraing - a.averageraing
    };


    if (sortbook[criteria]) {
        library.sort(sortbook[criteria]);
        console.log(`Library sorted by ${criteria}.`);
    } else {
        console.log("Invalid sorting criteria.");
    }
}

sortLibrary('averagerating') //sort by average rating og book

console.table(library);





