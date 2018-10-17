function Library() {};

Library.prototype.handleEventTrigger = function (sEvent,oData)
{
  var oData = oData || {};
  if(sEvent) {
    var event = new CustomEvent(sEvent, {'detail':oData});
    document.dispatchEvent(event);
  }
};

Library.prototype.addBook = function(book)
{
  for(var i = 0; i < window.bookShelf.length; i++) {
    if(book.title.toLowerCase().trim() === window.bookShelf[i].title.toLowerCase().trim()){
      console.log("Sorry " + book.title + " already exists.");
      return false;
    }
  }
  console.log("added " + book.title + " to book shelf");
  window.bookShelf.push(book);
  this.setStorage();
  return true;
};

Library.prototype.editBook = function(book)
{
  for(var i = 0; i < window.bookShelf.length; i++) {
    if(book.title.toLowerCase().trim() === window.bookShelf[i].title.toLowerCase().trim()){

      window.bookShelf[i].cover = book.cover;
      window.bookShelf[i].author = book.author;
      window.bookShelf[i].synopsis = book.synopsis;
      window.bookShelf[i].numberOfPages = book.numberOfPages;
      window.bookShelf[i].publishDate = book.publishDate;
      window.bookShelf[i].rating = book.rating;

      console.log("Book: " + book.title + " Updated.");
      this.setStorage();

      return true;
    }
  }
  console.log("Sorry " + book.title + " is not in book shelf. ");
  return false;
};

Library.prototype.removeBookByTitle = function(title)
{
  for (var i = 0; i < window.bookShelf.length; i++) {
    if(window.bookShelf[i].title.toLowerCase() === title.toLowerCase()) {
      console.log("removed " + window.bookShelf[i].title + " from book shelf");
      window.bookShelf.splice(i,1);
      this.setStorage();
      return true;
    }
  }
  return false;
};

Library.prototype.removeBookByAuthor = function(author)
{
  var booksRemoved = false;
  for (var i = window.bookShelf.length - 1; i >= 0; i--) {
    if (window.bookShelf[i].author.toLowerCase() === author.toLowerCase()) {
      window.bookShelf.splice(i, 1);
      booksRemoved = true;
      this.setStorage();
    }
  }

  return booksRemoved;
};

Library.prototype.getRandomBook = function()
{
  if(window.bookShelf.length){
    return window.bookShelf[Math.floor(Math.random() * Math.floor(window.bookShelf.length))];
  }

  return null;
};

Library.prototype.getBookByTitle = function(title)
{
  var matchedArr = [];
  for (var i = 0; i < window.bookShelf.length; i++) {
    if(window.bookShelf[i].title.toLowerCase().search(title.toLowerCase()) >= 0){
      matchedArr.push(window.bookShelf[i]);
    }
  }
  return matchedArr;
};

Library.prototype.getBooksByAuthor = function(authorName)
{
  var matchedArr = [];
  for (var i = 0; i < window.bookShelf.length; i++) {
    if(window.bookShelf[i].author.toLowerCase().search(authorName.toLowerCase()) >= 0){
      matchedArr.push(window.bookShelf[i]);
    }
  }
  return matchedArr;
};

Library.prototype.addBooks = function(books)
{
  var counter = 0;
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i])) {
      counter++;
    }
  }
  this.setStorage();
  return counter;
};

Library.prototype.getAuthors = function()
{
  if (window.bookShelf.length) {
    return window.bookShelf.unique("author");
  }
  return [];
};

Library.prototype.getRandomAuthorName = function()
{
  if (!window.bookShelf.length) {
    return null;
  } else {
    return window.bookShelf[Math.floor(Math.random() * Math.floor(window.bookShelf.length))].author;
  }
};

Library.prototype.search = function(searchParams) //searchParams is an object
{//remove below code and implement your own search function

  console.log(searchParams)
  //TODO: ADD YOUR OWN SEARCH FUNCTION HERE

  var foundTitle = [];
  var foundAuthor = [];
  var foundResult = [];

  if (searchParams.hasOwnProperty('title')) {
    foundTitle = this.getBookByTitle(searchParams.title);
  }

  if (searchParams.hasOwnProperty('author')) {
    foundAuthor = this.getBooksByAuthor(searchParams.author);
  }

  foundResult = foundTitle.concat(foundAuthor);

  var unique_array = []
  for(let i = 0;i < foundResult.length; i++){
    if(unique_array.indexOf(foundResult[i]) == -1){
        unique_array.push(foundResult[i])
    }
  }

  return unique_array;
};

Library.prototype.getStorage = function()
{
  var arr = [];
  var parsedObj = JSON.parse(localStorage.getItem("myLibrary"));
  for (var i = 0; i < parsedObj.length; i++) {
    arr.push(new Book(parsedObj[i]));
  }
  return arr;
};

Library.prototype.setStorage = function()
{
  localStorage.setItem('myLibrary', JSON.stringify(window.bookShelf));
  return console.log("STORAGE HAS BEEN SET");
};
