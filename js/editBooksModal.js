class EditBooksModal extends Library {

  constructor(oArgs) { //class constructor
    super();
    this.$container = $('#edit-books-modal');
  }

  init()
  {
    this._bindEvents();
  };

  //Use the function below to add cover art as a base64 encoded string
  //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  //If you get stuck reference the documents in the link above
  _handleImageUploadEdit()
  {
    var previewEdit = document.querySelector('#editBookCoverImage');
    var fileEdit = document.querySelector('#cover-edit-input').files[0];
    var readerEdit = new FileReader();


    readerEdit.addEventListener("load", function () {
      previewEdit.src = readerEdit.result;
    }, false);

    if (fileEdit) {
      return readerEdit.readAsDataURL(fileEdit);
    }
  };

  _bindEvents()
  {
    $('#edit-books-modal').on('hidden.bs.modal', $.proxy(this._updateBooks,this));
    $('#cover-edit-input').on('change', $.proxy(this._handleImageUploadEdit,this));

  };

  _loadBookHandler(e)
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

  _updateBooks()
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

    this.handleEventTrigger('objUpdate',window.bookShelf);

  };

};


$(function()
{
  window.gEditBooksModal = new EditBooksModal();
  window.gEditBooksModal.init();
});
