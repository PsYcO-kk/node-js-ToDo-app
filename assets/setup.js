$(document).ready(function(){
  $('form').on('submit', function(){
    $('input').prop('disabled', true);

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

  $('.edit-btn').on('click', function(){
    $('.edit-btn').prop('hidden', false);
    $('.todo-item').prop('disabled', true);
    $('.x-btn').prop('hidden', true);
    $('.update-btn').prop('hidden', true);

    var selected = $(this).attr("id");
    var item = selected.split('edit_').join("");

    $(this).prop('hidden', true);
    $('#todo_'+item).prop('disabled', false);
    $('#x_'+item).prop('hidden', false);
    $('#update_'+item).prop('hidden', false);
  });

  $('.x-btn').on('click', function(){
    var selected = $(this).attr("id");
    var item = selected.split('x_').join("");

    $(this).prop('hidden', true);
    $('#todo_'+item).prop('disabled', true);
    $('#edit_'+item).prop('hidden', false);
    $('#update_'+item).prop('hidden', true);
  });

  $('.update-btn').on('click', function(){
    $('input').prop('disabled', true);

    var confirmed = confirm("Do you want to update this todo?");
    if(confirmed){
      var selected = $(this).attr("id");
      var id = selected.split('update_').join("");

      var item = $('#todo_'+id).val();
      var todo = {item: item};

      $.ajax({
        type: 'PUT',
        url: '/todo/'+id,
        data: todo,
        success: function(data){
          if(data === 'done') location.reload();
          else {
            $('p').text('Update Failed. Please try again...');
            $('p').prop('hidden', false);
            setTimeout(function(){
              $('p').prop('hidden', true);
            }, 1500);
          }
        }
      });
    }
    else{
      $('input').prop('disabled', false);
    }
  });

  $('.delete-btn').on('click', function(){
    $('input').prop('disabled', true);

    var confirmed = confirm("Do you want to delete this item?");
    if(confirmed){
      var selected = $(this).attr("id");
      var id = selected.split('delete_').join("");

      $.ajax({
        type: 'DELETE',
        url: '/todo/'+id,
        success: function(data){
          if(data === 'done') location.reload();
          else {
            $('p').text('Delete Failed. Please try again...');
            $('p').prop('hidden', false);
            setTimeout(function(){
              $('p').prop('hidden', true);
            }, 1500);
          }
        }
      });
    }
    else{
      $('input').prop('disabled', false);
    }
  });
});
