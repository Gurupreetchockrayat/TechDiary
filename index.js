const { log } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', function(req, res) {
    fs.readdir('./files', (err, files)=> {

        res.render('index', {files:files})
    })
})

app.get('/files/:fileName',function(req, res) {
    fs.readFile(`./files/${req.params.fileName}`,'utf-8', function(err,file) {
        res.render('read',{fileName:req.params.fileName, fileData:file})
    })
})

app.get('/rename/:fileName',function(req, res) {
    res.render('rename', {fileName:req.params.fileName})
})
app.get('/delete/:fileName', function(req, res) {
    res.render('delete', {deletefile:req.params.fileName})
})

app.post('/rename', function(req, res) {
    fs.rename(`./files/${req.body.oldName }`, `./files/${req.body.newName}.`, function(err) {
      
        res.redirect('/')
    })
})
app.post('/delete', function(req, res) {
   
    fs.unlink(`./files/${req.body.deletefile}`, function(err) {
      
        res.redirect('/')
    })
})

app.post('/add', function(req, res) {
    fs.writeFile(`./files/${req.body.title.split('').join('')}`,`${req.body.detail}`, function(err) {
        res.redirect('/')
    })
    
})


app.listen(3000);