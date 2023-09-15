// Book class for store details of book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.checkedOut = false;
        this.checkoutCount = 0;
        this.dueDate = null;
        this.reviews = [];
        this.ratings = [];
        this.averageRating = 0;
        this.transactions = [];
    }
}

const book1 = new Book("To Kill a Mockingbird", "Harper Lee", 123456789);
const book2 = new Book("1984", "George Orwell", 987654321);
const book3 = new Book("Brave New World", "Aldous Huxley", 456789123);
const book4 = new Book("World War", "Nick", 234567891);
const book5 = new Book("Taitanic", "Deo", 891685478);
const book6 = new Book("Amongus", "John", 234567891);



//Library class contains all methods 
class Library {
    constructor() {
        this.books = [];
        console.log('this is cunstructor');
    }
    //-----------------------------------------------------------------------------------

    //1. Display all books of library
    showbook() {
        console.table(this.books);
    }
    //-----------------------------------------------------------------------------------

    //2. Add Books to Library
    addBookToLibrary(book) {
        const existingBook = this.books.find((existingBook) => {
            return existingBook.isbn === book.isbn;
        });
        if (existingBook) {
            console.log(
                `A book with ISBN "${book.isbn}" already exists in the library.`
            );
        } else {
            this.books.push(book);
            console.log(`Book "${book.title}" has been added to the library.`);
        }

    }
    //--------------------------------------------------------------------------------------------------

    //common function for find book by isbn
    findBookByISBN(isbn) {
        return this.books.find((book) => book.isbn === isbn);
    }
    //--------------------------------------------------------------------------------------------------

    //common transaction record function
    transactionRecord(book, type, user) {
        const transaction = {
            date: new Date().toDateString(),
            type: type,
            user: user,
        };
        book.transactions.push(transaction);
    }
    //--------------------------------------------------------------------------------------------------

    //3. checkout Book
    checkoutBook(isbn, user) {
        let MAX_CHECKOUTS = 3;
        const book = this.findBookByISBN(isbn);
        if (book) {
            //check max checkouts
            if (book.checkoutCount < MAX_CHECKOUTS) {
                book.checkedOut = true;
                book.checkoutCount++;

                //store checkout transaction
                this.transactionRecord(book, "checkout", user);

                //add due date to the book
                const dueDate = new Date();
                dueDate.setDate(2); //set date 2 sptember
                // dueDate.setDate(dueDate.getDate() + 10) // for set due date to 10 days from now
                book.dueDate = dueDate;

                console.log(
                    `Book with ISBN ${isbn} has been checked out. ${book.checkoutCount} times.`
                );
            } else {
                console.log(
                    `Book "${book.isbn}" cannot be checked out. Maximum checkout limit reached.`
                );
            }
        } else {
            console.error(`Book with ISBN ${isbn} was not found.`);
        }
    }
    //----------------------------------------------------------------------------------------------

    //4. Return Book
    returnBook(isbn, user) {
        const book = this.findBookByISBN(isbn);

        if (book) {
            book.checkedOut = false;
            console.log(`Book with ISBN ${isbn} has been returned.`);

            //store return transaction
            this.transactionRecord(book, "return", user);
        } else {
            console.error(`Book with ISBN ${isbn} was not found.`);
        }
    }
    //----------------------------------------------------------------------------------------

    //5.search books by author or title
    searchbook(query) {
        const lowerquery = query.toLowerCase();

        const matchingBook = this.books.filter((book) => {
            const title = book.title.toLowerCase();
            const author = book.author.toLowerCase();
            return title.includes(lowerquery) || author.includes(lowerquery);
        });

        if (matchingBook.length >= 1) {
            console.log(matchingBook);
        } else {
            console.error(`Book not found.`);
        }
    }
    //----------------------------------------------------------------------------------------------

    //6. display avilable books
    displayAvailableBooks() {
        const availableBooks = this.books.filter((book) => {
            return !book.checkedOut; //return avilable books as array
        });

        console.log("Available Books:");
        availableBooks.forEach((book) => {
            console.log(`Title: ${book.title}, Author: ${book.author}`);
        });
    }
    //------------------------------------------------------------------------------------

    //7. diaplsy checkedout books
    displayCheckedOutBooks() {
        const checkedOutBooks = this.books.filter((book) => {
            return book.checkedOut; //return checkedoutbooks as array
        });
        console.log("Checked Out Books:");
        checkedOutBooks.forEach((book) => {
            console.log(`Title: ${book.title}, Author: ${book.author}`);
        });
    }
    //--------------------------------------------------------------------------------------

    //8.Add reviews Books Function
    addReviewAndRating(isbn, rating, content, user) {
        const book = this.findBookByISBN(isbn);
        if (book) {
            if (rating >= 1 && rating <= 5) {
                // book.ratings.push(rating)
                let review = {
                    rating: rating,
                    content: content,
                    user: user,
                };
                // push the review object into the 'reviews' array
                book.reviews.push(review);

                // push the rating into the 'ratings' array
                book.ratings.push(rating)

                console.log(`Review and rating added to book "${book.title}": [Rating: ${rating}, Content: ${content}, User: ${user}]`);

                // Store the combined action in the transaction record
                this.transactionRecord(book, "add review and rating", user);
            } else {
                console.log("Invalid rating. Please provide a rating between 1 and 5.");
            }
        } else {
            console.error(`Book with ISBN "${isbn}" not found in the library.`);
        }
    }
    //--------------------------------------------------------------------------------------------

    //9.Calculate Average rate of book
    averagerate() {
        this.books.map((book) => {
            if (book.ratings.length > 0) {
                let totalRating = book.ratings.reduce((sum, current) => {
                    return (sum += current);
                });
                let averagerating = totalRating / book.ratings.length;
                console.log(
                    `Average rating of "${book.title}"is ${averagerating.toFixed(1)}`
                );
                book.averageRating = Number(averagerating.toFixed(1));
            } else {
                book.averageRating = 0;
            }
        });
    }
    //--------------------------------------------------------------------------------------

    //10.function for list over due date books
    listOverdueBooks() {
        const currentDate = new Date();
        const overdueBooks = this.books.filter((book) => {
            return book.checkedOut && book.dueDate && book.dueDate < currentDate;
        });
        console.log(overdueBooks);
    }
    //--------------------------------------------------------------------------------------------

    //11.function for save library items list in local storage
    saveLibrary() {
        try {
            localStorage.setItem("library", JSON.stringify(library));
            console.log("Library data saved to localStorage.");
        } catch (error) {
            console.error("Error saving library data to localStorage:", error);
        }
    }
    //--------------------------------------------------------------------------------------------

    //12.function for load library from local storage
    loadLibrary() {
        try {
            const storedLibrary = localStorage.getItem("library");
            const parsedLibrary = JSON.parse(storedLibrary);
            library.length = 0; //clear books from library
            library.push(...parsedLibrary);
        } catch (error) {
            console.error("Error loading library data from localStorage:", error);
        }
    }
    //--------------------------------------------------------------------------------------------

    //13.sort the library based on the provided criteria
    sortLibrary(criteria) {
        const sortbook = {
            title: (a, b) => a.title.localeCompare(b.title),
            author: (a, b) => a.author.localeCompare(b.author),
            checkoutCount: (a, b) => b.checkoutCount - a.checkoutCount,
            averagerating: (a, b) => b.averageRating - a.averageRating,
        };

        if (sortbook[criteria]) {
            //jo aapde sortbook.criteria lkhea to javascript "critera" namni property sortbbok object ni andr find krse
            this.books.sort(sortbook[criteria]); //and jo aapde sortbook[criteria] lkhsu tyare sortbook ni andar criteria ni value sodhse (sortbook.criteria ni value)
            console.log(`Library sorted by ${criteria}.`);
        } else {
            console.log("Invalid sorting criteria.");
        }
    }


}
const library = new Library();

//calling function 2 addBookToLibrary
library.addBookToLibrary(book1);
library.addBookToLibrary(book3);
library.addBookToLibrary(book2);
library.addBookToLibrary(book4);
library.addBookToLibrary(book5);
library.addBookToLibrary(book6);

//calling function 3 checkoutBook
library.checkoutBook(123456789, "user1");
library.checkoutBook(123456789, "user2");
library.checkoutBook(987654321, "user1");
library.checkoutBook(4567891, "user3"); // book not found


//calling function 4 returnBook
library.returnBook(123456789, "user1");
library.returnBook(3456789, "user2");

//calling function 5 searchbook
library.searchbook("Har");
library.searchbook("worldjjj");

//calling function 6 rdisplayAvailableBooks
library.displayAvailableBooks();

//calling function 7 displayCheckedOutBooks
library.displayCheckedOutBooks();

//calling function 8 add review content
library.addReviewAndRating(123456789, 3, "very nice book", "user1");
library.addReviewAndRating(123456789, 2, "good content", "user2");
library.addReviewAndRating(987654321, 4, "learn very great things from this book", "user3");

//calling function 9 averagerate
library.averagerate();

//calling function 10 listOverdueBooks
library.listOverdueBooks();

//calling function 11 saveLibrary
library.saveLibrary();

//calling function 12 loadLibrary
library.loadLibrary();

//calling function 13 sortLibrary
library.sortLibrary("title"); //sort by checkoutCount og book

//calling function 1 showbook
library.showbook();




