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

  document.getElementById("form-remove-book").reset();

  this.handleEventTrigger('objUpdate',window.bookShelf);

};

$(function()
{
  window.gRemoveBooksModal = new RemoveBooksModal();
  window.gRemoveBooksModal.init();
});
