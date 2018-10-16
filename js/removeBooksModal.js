function RemoveBooksModal()
{
  Library.call(this); //resets context
  this.$container = $('#remove-books-modal');//assign based on what targeting
};

//Creates new library object
RemoveBooksModal.prototype = Object.create(Library.prototype);

RemoveBooksModal.prototype.init = function()
{
  this._bindEvents();
};

RemoveBooksModal.prototype._bindEvents = function ()
{
  $('#remove-book-button').on('click',$.proxy(this._removeBooksHandler,this));
  $('#remove-books-modal').on('hidden.bs.modal', $.proxy(this._resetForm,this));
};

RemoveBooksModal.prototype._resetForm = function ()
{
  $('#title-remove-input').val('');
  $('#author-remove-input').val('');
};

RemoveBooksModal.prototype._removeBooksHandler = function ()
{
  var delTitle = $("#title-remove-input").val();
  var delAuthor = $("#author-remove-input").val();

  if (delTitle) {
    this.removeBookByTitle(delTitle);
  }
  if (delAuthor) {
    this.removeBookByAuthor(delAuthor);
  }

  window.bookShelf = this.getStorage();
  this.handleEventTrigger('objUpdate',window.bookShelf);
};

$(function()
{
  window.gRemoveBooksModal = new RemoveBooksModal();
  window.gRemoveBooksModal.init();
});
