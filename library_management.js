//1. Book Object Creation
function createBook(title, author, isbn) {
    return {
        title: title,
        author: author,
        isbn: isbn,
        checkedOut: false
    };
}
//calling function createBook
const book1 = createBook("To Kill a Mockingbird", "Harper Lee", 123456789);
const book2 = createBook("1984", "George Orwell", 987654321);
const book3 = createBook("Brave New World", "Aldous Huxley", 456789123);
const book4 = createBook(" World War", "Nick", 234567891);
const book5 = createBook(" Taitanic", "Deo", 891685478);
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

//3. checkout Book
function checkoutBook(isbn) {
    const book = library.find((book) => {
        return book.isbn === isbn
    });
    if (book) {
        book.checkedOut = true;
        console.log(`Book with ISBN ${isbn} has been checked out.`);
    } else {
        console.error(`Book with ISBN ${isbn} was not found.`);
    }
}
//calling function checkoutBook
checkoutBook(123456789);
checkoutBook(987654321);
checkoutBook(4567891);
//library all   books
console.table(library);

//----------------------------------------------------------------------------------------------

//4. Return Book
function returnBook(isbn) {
    const book = library.find((book) => {
        return book.isbn === isbn
    });

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

//5.find book by author
function findBooksByAuthor(author) {
    const booksofauthor = library.filter((book) => {
        return book.author === author //jo {} na hoy to return na lkho to chale, pan jo {} hoy to return lkjvuj pd
    });
    if (booksofauthor.length >= 1) {
        console.table(booksofauthor);
    } else {
        console.error(`Author not found.`);
    }

}
//calling function findBooksByAuthor
findBooksByAuthor("Harper Lee");

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

//----------------------------------------------------------------------------------

//library all   books
console.table(library);


