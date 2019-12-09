import BookService from './services/BookService';
import {format} from 'timeago.js';
const bookService = new BookService();

class UI {
     async renderBooks(){
        const books = await bookService.getBook();
        const bookCardContainer =  document.getElementById('card-book');
        bookCardContainer.innerHTML = '';

        books.forEach(book => {
            const div = document.createElement('div');
            div.className= '';
            div.innerHTML = `
                <div class="col-4">
                    <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 18rem;">
                      <img src="${book.imagePath}" class="card-img-top" alt="...">
                      <div class="card-body">
                          <h5 class="card-title text-info">${book.title}</h5>
                          <h6 class="card-subtitle mb-2 text-dark">${book.author}</h6>
                          <p class="card-text">${book.description}</p>
                      </div>
                      <footer>
                        <div class="d-flex my-2">
                            <a href="#" class="btn btn-danger delete mx-auto" _id="${book._id}">Delete</a>
                        </div>
                        <div class="d-flex my-2 justify-content-center">
                            <span class="d-block">${format(book.created_at)}</span>
                        </div>
                        </footer>
                    </div>
                </div>
            `;
            bookCardContainer.appendChild(div);
        });


        console.log(books);
    } 

    async addBook(book){
        await bookService.postBook(book);

        this.clearBook();
        this.renderBooks();
    }

    clearBook(){
        document.getElementById('book-form').reset();
    }

    renderMessage(message,colorMessage,timeMessage){
        const divMessage = document.createElement('div');
        divMessage.className = `alert alert-${colorMessage} message`;
        divMessage.appendChild(document.createTextNode(message));
        
         const containerMessage = document.getElementById('messageID');
         
         containerMessage.appendChild(divMessage);

         setTimeout(() => {
             document.querySelector('.message').remove();
         },timeMessage);

    }

    async deleteBook(bookId){
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }

}

export default UI;