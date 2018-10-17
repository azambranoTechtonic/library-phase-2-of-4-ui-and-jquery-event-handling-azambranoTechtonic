function EditBooksModal()
{
  Library.call(this); //resets context
  this.$container = $('#edit-books-modal');//assign based on what targeting
};

//Creates new library object
EditBooksModal.prototype = Object.create(Library.prototype);

EditBooksModal.prototype.init = function()
{
  this._bindEvents();
};

//Use the function below to add cover art as a base64 encoded string
//https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
//If you get stuck reference the documents in the link above
EditBooksModal.prototype._handleImageUploadEdit = function ()
{
  var previewEdit = document.querySelector('#editBookCoverImage');
  var fileEdit = document.querySelector('input[type=file]').files[0];
  var readerEdit = new FileReader();

  readerEdit.addEventListener("load", function () {
    previewEdit.src = readerEdit.result;
  }, false);

  if (fileEdit) {
    return reader.readAsDataURL(fileEdit);
  }
};

EditBooksModal.prototype._bindEvents = function ()
{
  $('#edit-books-modal').on('hidden.bs.modal', $.proxy(this._updateBooks,this));
  //$('#cover-edit-input').on('change', $.proxy(this._handleImageUploadEdit,this));
  $(document).on('change','#cover-edit-input',$.proxy(this._handleImageUploadEdit,this));
  //$(document).on('click',".title-cell",$.proxy(this._loadBookHandler,this));
};

EditBooksModal.prototype._loadBookHandler = function (e)
{
    var clickedCell= $(e.target).closest("td");
    var reqBook = this.getBookByTitle(clickedCell.text())

    if (reqBook.length > 0) {

      var editImg = $('<img>').addClass('tableImg').attr('src', reqBook[0].cover);
      $('#editBookCoverImage').html(editImg);

      //$('#cover-edit-input').val(reqBook[0].cover);
      $('#title-edit-input').val(reqBook[0].title);
      $('#author-edit-input').val(reqBook[0].author);
      $('#synopsis-edit-input').val(reqBook[0].synopsis);
      $('#pages-edit-input').val(reqBook[0].numberOfPages);
      $('#date-edit-input').val(reqBook[0].publishDate);
      $('#rating-edit-input').val(reqBook[0].rating);

    }

    return false;
};

EditBooksModal.prototype._updateBooks = function ()
{

  var myBook = new Book({cover: $('#editBookCoverImage').attr('src'),
                        title: $('#title-edit-input').val(),
                        author: $('#author-edit-input').val(),
                        synopsis: $('#synopsis-edit-input').val(),
                        numberOfPages: $('#pages-edit-input').val(),
                        publishDate: $('#date-edit-input').val(),
                        rating: $('#rating-edit-input').val()});

  this.editBook(myBook);

  $('#editBookCoverImage').removeAttr('src');
  $('#cover-edit-input').val('');
  $('#title-edit-input').val('');
  $('#author-edit-input').val('');
  $('#synopsis-edit-input').val('');
  $('#pages-edit-input').val('300');
  $('#date-edit-input').val('2017-01-01');
  $('#rating-edit-input').val('');

  window.bookShelf = this.getStorage();
  this.handleEventTrigger('objUpdate',window.bookShelf);

};

$(function()
{
  window.gEditBooksModal = new EditBooksModal();
  window.gEditBooksModal.init();
});
