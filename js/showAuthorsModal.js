class ShowAuthorsModal extends Library {

  constructor(oArgs) { //class constructor
    super();
    this.$container = $('#author-display-modal');
  }

  init()
  {
    this._bindEvents();
  };

  _bindEvents()
  {
    $('button#show-authors-button').on('click',$.proxy(this._handleDisplayAuthors,this));
  };

  _handleDisplayAuthors()
  {
    var myObj = this.getAuthors();
    for(var i=0; i < myObj.length; i++) {
          $("#authors-ul").append('<li>' + myObj[i].author + '</li>');
    };
  };

};


$(function()
{
  window.gShowAuthorsModal = new ShowAuthorsModal();
  window.gShowAuthorsModal.init();
});
