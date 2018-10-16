
function ShowAuthorsModal()
{
  Library.call(this); //resets context
  this.$container = $('#author-display-modal');//assign based on what targeting
};

//Creates new library object
ShowAuthorsModal.prototype = Object.create(Library.prototype);

ShowAuthorsModal.prototype.init = function()
{
  this._bindEvents();
};

ShowAuthorsModal.prototype._bindEvents = function ()
{
  $('button#show-authors-button').on('click',$.proxy(this._handleDisplayAuthors,this));
};

ShowAuthorsModal.prototype._handleDisplayAuthors = function ()
{
  var myObj = this.getAuthors();
  for(var i=0; i < myObj.length; i++) {
        $("#authors-ul").append('<li>' + myObj[i].author + '</li>');
  };
};

$(function()
{
  window.gShowAuthorsModal = new ShowAuthorsModal();
  window.gShowAuthorsModal.init();
});
