const express = require("express");
const bookStore = require("./data")

const app = express();
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendStatus("Ok")
})


  /**
   * List all books
   */
app.get('/books', (req, res)=>{
    res.json(bookStore);
})

/**
 * Get a single book
 */

app.get("/books/:bookId", (req, res)=>{
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
})

/**
 * Delete a single book
 */

app.delete("/books/:bookId", (req, res)=>{
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
})

/**
 * Post a new book
 */

app.post('/books',(req, res)=>{
    let newBook = req.body;
    bookStore.push(newBook);
    res.json({
        success: true,
        message: "New Book saved",
        totalBooks: bookStore.length,
        books:bookStore
    })
})




const port = 3000;
app.listen(port, ()=>console.log(`Server listening on PORT: ${port}`))