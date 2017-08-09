const port = 3004
const express = require('express')
const app = express()
const path = require('path')
const pug = require('pug')
const bodyParser = require('body-parser')
const {addTask, getList, deleteTask}= require('./models/queries.js')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/todos', (req, res) => {
  getList().then(toDos => {
    res.render('todos', {toDos: toDos})
  })
})

app.post('/addToDo', (req, res) => {
  addTask(req.body.submittedTask)
    .then(() => {
      res.redirect('/todos')
    })
})

app.post('/todos/delete/:id', (req, res) => {
  deleteTask(req.params.id)
    .then(() => {
      res.redirect('/todos')
    })
})

app.listen(port, () => console.log('Listening on port: ' + port))
