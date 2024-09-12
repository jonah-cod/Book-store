const bookStore = require("../data")
const { idGenerator } = require("../utils/idGen")

/**
   * List all books
   */
function getAllBooks(req, res){
    res.json(bookStore);
}

/**
 * Gets a single book
 */

function getBookById(req, res){
    let {bookId} = req.params;
    let requestedId = Number(bookId)

    let requestedBook = bookStore.find(book=>book.id===requestedId);

    if (!requestedBook) {
        res.status(404).json({
            success:false,
            message: "Book not found!",
            id: requestedId
        })
        return
    }
    
    res.json({
        success: true,
        message: "Book found",
        book: requestedBook
    })
}

/**
 * Deletes a single book
 */

function deleteBookById(req, res){
    let {bookId} = req.params;
    let requestedId = Number(bookId);

    let indexOfBook = bookStore.findIndex(book=>book.id===requestedId);

    if (indexOfBook === -1) {
        res.status(404).json({
            success: false,
            message: "Book not found",
            requestedId
        });
        return;
    }
    
    bookStore.splice(indexOfBook,1);
    
    res.json({
        success: true,
        message: "Book deleted",
        totalBook: bookStore.length,
        id: requestedId,
        books: bookStore
    });
}

/**
 * Post a new book
 */

function saveNewBook(req, res){
    let newBook = req.body;
    newBook.id = idGenerator()
    bookStore.push(newBook);
    res.json({
        success: true,
        message: "New Book saved",
        totalBooks: bookStore.length,
        books:bookStore
    })
}


module.exports= {getAllBooks, getBookById, deleteBookById, saveNewBook}