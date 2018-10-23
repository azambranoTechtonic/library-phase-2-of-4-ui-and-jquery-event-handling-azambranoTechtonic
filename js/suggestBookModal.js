function SuggestBooksModal()
{
  Library.call(this); //resets context
  this.$container = $('#book-display-modal');//assign based on what targeting
};

//Creates new library object
SuggestBooksModal.prototype = Object.create(Library.prototype);

SuggestBooksModal.prototype.init = function()
{
  this._bindEvents();
};

SuggestBooksModal.prototype._bindEvents = function ()
{
  $('button#random-book-button').on('click',$.proxy(this._suggestBooksHandler,this));
  $('#book-display-modal').on('hidden.bs.modal', $.proxy(this._removeData,this));
};

SuggestBooksModal.prototype._suggestBooksHandler = function ()
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

SuggestBooksModal.prototype._removeData = function ()
{
  $("#mod-book-side").empty();
};

$(function()
{
  window.gSuggestBooksModal = new SuggestBooksModal();
  window.gSuggestBooksModal.init();
});
