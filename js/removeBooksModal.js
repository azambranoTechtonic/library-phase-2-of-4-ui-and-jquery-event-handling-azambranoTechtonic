class RemoveBooksModal extends Library {

  constructor(oArgs) { //class constructor
    super();
    this.$container = $('#remove-books-modal');
  }

  init()
  {
    this._bindEvents();
  };

  _bindEvents()
  {
    $('#remove-book-button').on('click',$.proxy(this._removeBooksHandler,this));
  };

  _removeBooksHandler()
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

};

$(function()
{
  window.gRemoveBooksModal = new RemoveBooksModal();
  window.gRemoveBooksModal.init();
});
