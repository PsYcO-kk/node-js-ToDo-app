$(document).ready(function(){
  $('form').on('submit', function(){
    var item = $('form input').val();
    var todo = {item: item};

    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: function(data){
        location.reload();
      }
    });
  });

  $('li').on('click', function(){
    var item = $(this).text().replace(/ /g, "-");

    $.ajax({
      type: 'DELETE',
      url: '/todo/'+item,
      success: function(data){
        location.reload();
      }
    });
  });
});
