class SuggestBooksModal extends Library {

  constructor(oArgs) { //class constructor
    super();
    this.$container = $('#book-display-modal');
  }

  init()
  {
    this._bindEvents();
  };

  _bindEvents()
  {
    $('button#random-book-button').on('click',$.proxy(this._suggestBooksHandler,this));
    $('#book-display-modal').on('hidden.bs.modal', $.proxy(this._removeData,this));
  };

  _suggestBooksHandler()
  {

    var myObj = this.getRandomBook();

    $('#mod-book-title').text(myObj.title + " By " + myObj.author);

    var img = $('<img>').addClass('tableImg').attr('src', myObj.cover);
    $("#mod-book-cover").html(img);

    //$("#mod-book-side").append('<h5>' + myObj.author + '</h5>');
    $("#mod-book-side").append('<h5>' + myObj.synopsis + '</h5>');
    $("#mod-book-side").append('<h5>' + myObj.numberOfPages + '</h5>');
    $("#mod-book-side").append('<h5>Publication date: ' + myObj.publishDate + '</h5>');

    $("#mod-book-side").append(this.stars(myObj.rating));

    $('#book-display-modal').modal('show');


    return false;

  };

  _removeData()
  {
    $("#mod-book-side").empty();
  };

};

$(function()
{
  window.gSuggestBooksModal = new SuggestBooksModal();
  window.gSuggestBooksModal.init();
});
