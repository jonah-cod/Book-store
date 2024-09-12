const router = require("express").Router();
const { getAllBooks, getBookById, deleteBookById, saveNewBook } = require("../controllers/booksController")


router.get('/', getAllBooks)
router.get("/:bookId", getBookById)
router.delete("/:bookId", deleteBookById)
router.post("/", saveNewBook)

module.exports = {booksRouter : router}