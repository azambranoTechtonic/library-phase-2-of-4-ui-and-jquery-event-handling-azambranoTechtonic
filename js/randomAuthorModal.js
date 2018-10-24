class RandomAuthorModal extends Library {

  constructor(oArgs) { //class constructor
    super();
    this.$container = $('#author-display-modal');
  }

  init()
  {
    //$(author-display-modal).on('show.bs.modal', $.proxy(this._showAuthor, this));
    //_showAuthor();
    this._bindEvents();

  };

  _bindEvents()
  {
    $('button#random-author-button').on('click',$.proxy(this._handleDisplayAuthor,this));
    $('#author-display-modal').on('hidden.bs.modal', $.proxy(this._removeData,this));
  };


  _handleDisplayAuthor()
  {
    var myObj = this.getRandomAuthorName();
    $("#author-ul").append('<li>' + myObj + '</li>');
  };

  _removeData()
  {
    //clear
    $("#author-ul").empty();
  };

};

$(function()
{
  window.gRandomAuthorModal = new RandomAuthorModal();
  window.gRandomAuthorModal.init();
});
