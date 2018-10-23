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
  var file = document.querySelector('#cover-add-input').files[0];
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
  $('#add-books-button').on('click', $.proxy(this._addBooksHandler,this));
  $('#cover-add-input').on('change', $.proxy(this._handleImageUpload,this));
};

var arrQueue = [];

AddBooksModal.prototype._queueBookHandler = function (e)
{

  e.preventDefault();

  var mySerBook = $("#form-add-book").serializeArray();
  var myBook = {};

  myBook['cover'] = $('#addBookCoverImage').attr('src')
  $.each(mySerBook, function(index, entry) {
    if (entry.value) {
      myBook[entry.name] = entry.value;
    }
  });

  console.log(myBook);

  arrQueue.push(myBook);

  document.getElementById("form-add-book").reset();
  $('#addBookCoverImage').removeAttr('src');

  $('#add-books-counter').text(arrQueue.length);

  return true;

};

AddBooksModal.prototype._addBooksHandler = function ()
{
  this.addBooks(arrQueue);
  $('#add-books-modal').modal('hide');
  this.handleEventTrigger('objUpdate',window.bookShelf);

};

$(function()
{
  window.gAddBooksModal = new AddBooksModal();
  window.gAddBooksModal.init();
});
