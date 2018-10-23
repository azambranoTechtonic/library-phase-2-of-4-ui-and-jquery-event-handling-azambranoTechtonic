
function RandomAuthorModal()
{
  Library.call(this); //resets context
  this.$container = $('#author-display-modal');//assign based on what targeting
};

//Creates new library object
RandomAuthorModal.prototype = Object.create(Library.prototype);

RandomAuthorModal.prototype.init = function()
{
  //$(author-display-modal).on('show.bs.modal', $.proxy(this._showAuthor, this));
  //_showAuthor();
  this._bindEvents();

};

RandomAuthorModal.prototype._bindEvents = function ()
{
  $('button#random-author-button').on('click',$.proxy(this._handleDisplayAuthor,this));
  $('#author-display-modal').on('hidden.bs.modal', $.proxy(this._removeData,this));
};


RandomAuthorModal.prototype._handleDisplayAuthor = function ()
{
  var myObj = this.getRandomAuthorName();
  $("#author-ul").append('<li>' + myObj + '</li>');
};

RandomAuthorModal.prototype._removeData = function ()
{
  //clear
  $("#author-ul").empty();
};



$(function()
{
  window.gRandomAuthorModal = new RandomAuthorModal();
  window.gRandomAuthorModal.init();
});
