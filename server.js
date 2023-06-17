const express = require('express');
const server = express();
const port = process.env.PORTT || 3001;

server.use(express.json());

// database
const books = require('./src/data/books.json');

// routes
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    return res.send("Server is running");
});

server.get('/books', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(books);
});

server.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);

    if (book) {
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
})

server.post('/books', (req, res) => {
    const { title, author } = req.body;
    const newId = books.length + 1;

    if (!title || !author) {
        res.status(400).json({ error: 'Please, give the title and author' });
    } else {
        res.setHeader('Content-Type', 'application/json');
        const newBook = { id: newId, title, author };
        books.push(newBook);
        res.status(201).json(newBook);
    }
});

server.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(book => book.id === id);

    if (book) {
        book.title = title || book.title;
        book.author = author || book.author;
        res.json(book);
    } else {
        res.status(404).json({ error: 'Livro não encontrado' });
    }
});

server.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.json(deletedBook[0]);
    } else {
        res.status(404).json({ error: 'Livro não encontrado' });
    }
});


server.listen(port, () => {
    console.log(`Server is running in ${port}`);
});