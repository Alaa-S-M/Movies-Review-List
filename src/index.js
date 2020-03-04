
function sortTable(compare,direction,keyIndex) {
    let table = $('table');
    let rows = table.find('tr:gt(0)').toArray().sort(compare(direction,keyIndex))
    
    for (var i = 0; i < rows.length; i++) {table.append(rows[i])}
  }
function compare(direction,keyIndex){
    return function(row1, row2) {
        let key1 = $(row1).children('td').eq(keyIndex).text(), 
        key2 = $(row2).children('td').eq(keyIndex).text();
        if(direction == 'up')
            return $.isNumeric(key1) ? key1 - key2 : key1.localeCompare(key2);
        return $.isNumeric(key1) ? key2 - key1 : key2.localeCompare(key1);
    }
}
$(document).ready(function () {
    $('#add').on('click', function (e) {     
        e.preventDefault();
        if(!$('#titleInput').val() || !$('#ratingInput').val()) return;
        let title = "<td>" + $('#titleInput').val() + "</td>\n";
        let rating = "<td>" + $('#ratingInput').val() + "</td>\n";
        let button = "<td> <button class=\'delete\'>Delete</button> </td>\n";
        newRow = "<tr>" + title + rating + button + "</tr>";
        $('table').append(newRow);  
    });
    $(document).on('click', '.delete', function () {
        $(this).closest("tr").remove();
    });
    $('.sortUp').on('click', function(){
        if($(this.closest('th')).text().indexOf('Title') >= 0 ){
            sortTable(compare,'up',0);
        }
        if($(this.closest('th')).text().indexOf('Rating') >= 0 ){
            sortTable(compare,'up',1);
        }
    });
    $('.sortDown').on('click', function(){
        if($(this.closest('th')).text().indexOf('Title') >= 0){
            sortTable(compare,'down',0);
        }
        if($(this.closest('th')).text().indexOf('Rating') >= 0){
            sortTable(compare,'down',1);
        }
    });
});