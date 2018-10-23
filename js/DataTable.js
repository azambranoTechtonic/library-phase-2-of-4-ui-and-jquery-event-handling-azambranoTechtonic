function DataTable()
{
  Library.call(this);
  this.$container = $('#data-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function()
{
  this._bindEvents();
  this._bindCustomListeners();
  this._updateStorage(); //all logic branches of _updateStorage call _updateTable, so this._updateTable is no longer necessary\
};

DataTable.prototype._bindEvents = function ()
{
  //TODO: add native events here for search and any others needed
};

DataTable.prototype._bindCustomListeners = function ()
{
  $('#search-form').on('submit',$.proxy(this._handleSearch,this));
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
  $('#show-books-button').on('click',$.proxy(this._updateStorage,this));
  $(document).on('click',".edit-button",$.proxy(this._editRow,this));
  $('#delete-books-button').on('click',$.proxy(this._deleteBooks,this));
  //This is a global object that can be accessed as window.bookShelf. This will hold the state of your bookShelf.
};


DataTable.prototype._deleteBooks = function (e)
{

    var checkedItems = $('.tr-book:has(input:checked)').closest("tr").find(".title-cell");

    for(var i=0; i<checkedItems.length; i++) {

      this.removeBookByTitle(checkedItems[i].innerText);

    }

  this.handleEventTrigger('objUpdate',window.bookShelf);

};


DataTable.prototype._editRow = function (e)
{

  var clickedCell= $(e.target).closest("tr").find(".title-cell").text();
  var reqBook = this.getBookByTitle(clickedCell)

  if (reqBook.length > 0) {

    //var img = $('<img>').addClass('tableImg').attr('src', reqBook[0].cover);
    $('#editBookCoverImage').attr('src', reqBook[0].cover); //.html(img);

    //$('#cover-edit-input').val(reqBook[0].cover);
    $('#title-edit-input').val(reqBook[0].title);
    $('#author-edit-input').val(reqBook[0].author);
    $('#synopsis-edit-input').val(reqBook[0].synopsis);
    $('#pages-edit-input').val(reqBook[0].numberOfPages);
    $('#date-edit-input').val(reqBook[0].publishDate);
    $('#rating-edit-input').val(reqBook[0].rating);

    $('#edit-books-modal').modal('show');

  }

  return false;
};

DataTable.prototype._handleSearch = function (e)
{
  e.preventDefault();
  var serArr = $('#search-form').serializeArray();
  var myObj = {};
  $.each(serArr,function(index, entry){
    if(entry.value){
      myObj[entry.name] = entry.value;
    }
  });
  var searchResults = this.search(myObj);
  this.handleEventTrigger('objUpdate', searchResults);

  return false;
};

DataTable.prototype._updateTable = function (e) {

  this._makeTable(e.detail);
};

DataTable.prototype._makeTable = function (books)
{
  var _self = this;
  var $tbody = this.$container.find('tbody');
  $tbody.empty();
  $('#books-table-head').html(this._createHead(new Book({})));
  $.each(books, function(index, book){
    $tbody.append(_self._createRow(book));
  });
};

DataTable.prototype._createHead = function (book)
{
  var tr = $('<tr>');
  for (var key in book) {
    var th = $('<th>').text(spacesToCamelCase(key));
    tr.append(th)
  }
  var dTH = $('<th>').text('Delete Book');
  tr.append(dTH);
  return tr;
};

DataTable.prototype._createRow = function (book)
{
  var tr = $('<tr class="tr-book">');
  //This created our delete column
  var deleteInput = $('<input id="del-check">').attr('type', 'checkbox');
  var editInput = $('<button class="edit-button">').attr('type', 'click').text("Edit...");
  for(var key in book){
    if (key === 'title') {
      var td = $('<td class="title-cell">');
    } else {
      var td = $('<td>');
    }
    if (key === 'cover') {
      var img = $('<img>').addClass('tableImg').attr('src', book[key]);
      $(td).html(img);
    } else if(key === 'rating'){
      $(td).html(this.stars(book[key]));
    } else if(key === 'editBook'){
      $(td).html(editInput);
    } else {
      $(td).html(key === 'synopsis' ? book[key].substring(0,85) + "..." : book[key]);
    }
    tr.append(td);
  }
  var deleteTd = $('<td>');
  $(deleteTd).append(deleteInput);
  tr.append(deleteTd);
  return tr;
};

DataTable.prototype._updateStorage = function ()
{
  if (window.localStorage.length > 0) {
    console.log('BOOKSHELF EXISTS SETTING VALUE');
    window.bookShelf = this.getStorage();
    this.handleEventTrigger('objUpdate',window.bookShelf);
  } else {
    console.log('BOOKSHELF DOES NOT EXIST ADDING BOOKS!');

    this.addBooks(bookify(bookList));
    this.handleEventTrigger('objUpdate',window.bookShelf);
    this.setStorage();
  }
};

//This is the document ready that will create a new instance of DataTable
//HINT: Each class||object will need a new instance to be initalized on document ready!
$(function()
{
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
