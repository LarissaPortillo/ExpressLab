const express=require('express');
const app=express();

const mood=['angry','sad','hungry','happy'];

const fs=require('fs');
app.engine('hypatia', (filePath,options,callback)=>{
    fs.readFile(filePath,(err,content)=>{
        if(err) return callback(err)
        const rendered=content.toString()
        .replace('#title#','<title>' + options.title + '</title>')
        .replace('#message#', '<h1>'+ options.message + '</h1>')
        .replace('#content#','<div>'+ options.content + '</div>' )
        .replace('#content2#','<div>'+ options.content2 + '</div>' )
    return callback(null, rendered)
    })
});

app.set('views', './views');
app.set('view engine', 'hypatia');


//1 http://localhost:3000/t1
app.get('/t1',(req,res)=>{
    res.render('template1',{ title: 'Template 1', message: 'Hello there!', content: 'You are inside template1' });
});

//2 http://localhost:3000/t2
app.get('/t2',(req,res)=>{
    res.render('template2',{ title: 'Template 2', message: 'Hi there!', content: 'You are inside template2',content2:'extra content on temp2' });
});

//3 http://localhost:3000/angry
app.get('/angry',(req,res)=>{
    res.send(`
    <title>Angry kitten</title>
    <h1>Angry kitty!</h1>
    <img src="https://pbs.twimg.com/media/FHeH4xnXIAEt0dk.png">
    `);
});

//4 http://localhost:3000/fairy
app.get('/fairy',(req,res)=>{
    res.send(`
    <title>Fairy kitty</title>
    <h1>I'm a fairy pwincess!</h1>
    <img src="https://64.media.tumblr.com/5762dbb6ab3371fbceaeb4f3d07b2ac6/590ef704d33705f2-df/s1280x1920/d332b8cc59ad2bd2d7cadc5e0620fb4f30a1c2d9.jpg">
    `);
});

//5 http://localhost:3000/home
app.get('/home',(req,res)=>{
    res.send(`
    <title>Home Page</title>
    <h1>Home Page</h1>
    `);
});

//6 http://localhost:3000/aboutMe
app.get('/aboutMe',(req,res)=>{
    res.send('about me');
});


//7 http://localhost:3000/info
app.get('/info',(req,res)=>{
    res.send('info');
});


//8 http://localhost:3000/favoritefood/?food=tacos
app.get('/favoriteFood/',(req,res)=>{
    res.send('Your favorite food is '+req.query.food+'? Noice');
});

//9 http://localhost:3000/mood/1
app.get('/mood/:moodIndx',(req,res)=>{
    if(mood[req.params.moodIndx]){
        res.send(mood[req.params.moodIndx]);
    }
    else{
        res.send(`This index is outside the length of the array`)
    }
    
});

//10 http://localhost:3000/Larissa
app.get('/:name',(req,res)=>{
    res.send('Hello'+req.params.name)
});


app.listen(3000,function(){
    console.log('Listening on port 3000');
  });