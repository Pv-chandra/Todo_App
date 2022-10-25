const express=require('express');
const port=3000;
const path=require('path');
const db=require('./database/mongoose');
const Todo=require('./models/todo');

const app=express();


app.use(express.static('design'));
app.use(express.urlencoded());

var todo_list=[];


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, function(err){
    if(err){
        console.log('error');
        return;
    }
    console.log("yup");
});


app.post('/create-task', function(req,res){
    Todo.create({
        desc: req.body.desc,
        date: req.body.date,
        categ: req.body.category   
    }, function(err, newTask){
        if(err){
            console.log('error');
            return;
        }
        console.log(newTask);
        return res.redirect('back');
    })
})

app.post('/delete-task', function(req, res){

    let id=req.body.task;

    Todo.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error');
            return;
        }
       return res.redirect('back');
        
    });
})

app.get('/', function(req, res){
    // return res.render('home', {
    //     title:"todo_app"
    // });
    Todo.find({}, function(err, tasks){
        if(err){
            console.log('error');
            return;
        }
        return res.render('home', {
            title: "todo_app",
            todo_list: tasks
        });
    });
});
