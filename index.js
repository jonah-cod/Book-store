const express = require("express");
const { booksRouter } = require("./routes/booksRoutes")

const app = express();
app.use(express.json())


app.get('/', (req, res)=>{
    res.sendStatus("Ok")
})

app.use("/books",booksRouter)

const port = 3000;
app.listen(port, ()=>console.log(`Server listening on PORT: ${port}`))