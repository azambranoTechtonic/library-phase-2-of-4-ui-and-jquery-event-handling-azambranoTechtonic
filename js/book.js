
class Book {
  constructor(oArgs) { //class constructor
    this.cover = oArgs.cover;
    this.title = oArgs.title; //Required
    this.author = oArgs.author; //Required
    this.synopsis = oArgs.synopsis;
    this.numberOfPages = oArgs.numberOfPages; //Required
    this.publishDate = new Date(String(oArgs.publishDate)).getUTCFullYear(); //Required
    this.rating = oArgs.rating;
  }

  editBook(oArgs) { //class method

    if (oArgs.hasOwnProperty('cover')) {
      this.cover = oArgs.cover;
    }

    if (oArgs.hasOwnProperty('title')) {
      this.title = oArgs.title;
    }

    if (oArgs.hasOwnProperty('author')) {
      this.synopsis = oArgs.author;
    }

    if (oArgs.hasOwnProperty('synopsis')) {
      this.author = oArgs.synopsis;
    }

    if (oArgs.hasOwnProperty('numberOfPages')) {
      this.numberOfPages = oArgs.numberOfPages;
    }

    if (oArgs.hasOwnProperty('publishDate')) {
      this.publishDate = oArgs.publishDate;
    }

    if (oArgs.hasOwnProperty('rating')) {
      this.rating = oArgs.rating;
    }

    return this;

  }

}
