function AddBooksModal()
{
  Library.call(this); //resets context
  this.$container = $('#add-books-modal');//assign based on what targeting
};

//Creates new library object
AddBooksModal.prototype = Object.create(Library.prototype);

AddBooksModal.prototype.init = function()
{
  this._bindEvents();
};

//Use the function below to add cover art as a base64 encoded string
//https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
//If you get stuck reference the documents in the link above
AddBooksModal.prototype._handleImageUpload = function ()
{
  var preview = document.querySelector('#addBookCoverImage');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    return reader.readAsDataURL(file);
  }
};

AddBooksModal.prototype._bindEvents = function ()
{
  $('button#queue-book-button').on('click',$.proxy(this._queueBookHandler,this));
  $('#add-books-modal').on('hidden.bs.modal', $.proxy(this._addBooks,this));
  $('#cover-add-input').on('change', $.proxy(this._handleImageUpload,this));
};

var arrQueue = [];

AddBooksModal.prototype._queueBookHandler = function (e)
{

  e.preventDefault();

  var myBook = new Book({cover: $('#addBookCoverImage').attr('src'),
                        title: $('#title-add-input').val(),
                        author: $('#author-add-input').val(),
                        synopsis: $('#synopsis-add-input').val(),
                        numberOfPages: $('#pages-add-input').val(),
                        publishDate: $('#date-add-input').val(),
                        rating: $('#rating-add-input').val()});

  arrQueue.push(myBook);

  $('#add-books-counter').text(arrQueue.length);

  $('#addBookCoverImage').removeAttr('src');
  $('#cover-add-input').val('');
  $('#title-add-input').val('');
  $('#author-add-input').val('');
  $('#synopsis-add-input').val('');
  $('#pages-add-input').val('300');
  $('#date-add-input').val('2017-01-01');
  $('#rating-add-input').val('');

  return true;

};

AddBooksModal.prototype._addBooks = function ()
{
  this.addBooks(arrQueue);

  window.bookShelf = this.getStorage();
  this.handleEventTrigger('objUpdate',window.bookShelf);


};

$(function()
{
  window.gAddBooksModal = new AddBooksModal();
  window.gAddBooksModal.init();
});
