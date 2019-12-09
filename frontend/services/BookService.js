class BookService {
  constructor() {
    this.URI = "/api/books";
  }

  async getBook() {
    const response = await fetch(this.URI);
    const data = await response.json();
    return data;
  }

  async postBook(book) {
    const response = await fetch(this.URI, {
      method: "POST",
      body: book
    });

    const data = response.json();
    console.log(data);
  }

  async deleteBook(bookId){
    const response = await fetch(`${this.URI}/${bookId}`,{
        headers : {
            'Content-Type':'application/json'
        },
        method : 'DELETE'
    });

    const data = response.json();
    console.log(data);
  }
}

export default BookService;