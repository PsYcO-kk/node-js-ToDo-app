var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo');

mongoose.connection.once('open', function(){
  console.log('Connection has been made...');
}).on('error', function(error){
  console.log('Connection error:', error);
});

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', function(req, res){
    Todo.find({}, function(err, result){
      if (err) throw err;
      res.render('todo', {todos: result});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    var newTodo = Todo(req.body).save(function(err, result){
      if (err) throw err;
      res.json(result);
    });
  });

  app.put('/todo/:id', urlencodedParser, function(req, res){
    Todo.findByIdAndUpdate({_id: req.params.id}, {item: req.body.item}, function(err, result){
      if (err) throw err;
      else res.send('done');
    });
  });

  app.delete('/todo/:id', function(req, res){
    Todo.find({_id: req.params.id}).remove(function(err, result){
      if (err) throw err;
      else res.send('done');
    });
  });

};
