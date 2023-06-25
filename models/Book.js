class Book {
  constructor(
    id,
    bookName,
    bookDescription,
    authorId,
    categoryId,
    numberOfPages
  ) {
    this.id = id;
    this.bookName = bookName;
    this.bookDescription = bookDescription;
    this.categoryId = categoryId;
    this.numberOfPages = numberOfPages;
  }
}

module.exports = Book;
