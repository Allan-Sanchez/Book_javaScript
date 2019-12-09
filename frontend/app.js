import './styles/styles.css';
// import BookService from './services/BookService';
import UI from './UI';

document.addEventListener('DOMContentLoaded',() => {
    const ui = new UI();
    ui.renderBooks();
});


document.getElementById('book-form').addEventListener('submit',(e) => {
    const title = document.getElementById('bookTitle').value; 
    const author = document.getElementById('bookAuthor').value; 
    const isbn = document.getElementById('bookIsbn').value; 
    const description = document.getElementById('bookDescription').value; 
    const image = document.getElementById('bookImage').files;
    
    // console.log(title,author,isbn,description,image);
    const data = new FormData();
    data.append('image',image[0]);
    data.append('title',title);
    data.append('author',author);
    data.append('isbn',isbn);
    data.append('description',description);

    // const bookService = new BookService();

    // bookService.postBook(data);

    const ui = new UI();

    ui.addBook(data);
    ui.renderMessage('book added success','success',3000);

    e.preventDefault();
});

document.getElementById('card-book').addEventListener('click',(e) => {
    if (e.target.classList.contains('delete')) {
        const ui = new UI();
        ui.deleteBook(e.target.getAttribute('_id'));
        ui.renderMessage('book removed success','danger',3000);

    }
    e.preventDefault();
})