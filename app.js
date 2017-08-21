const { addTask, getList, deleteTask, updateTask } = require('./models/queries.js')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const pug = require('pug')
const app = express()
const port = 3004

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) => {
  response.render('index')
})

app.get('/todos', (request, response) => {
  getList()
    .then(toDos => {response.render('todos', {toDos: toDos})})
    .catch(error => console.log(error))
})

app.post('/addToDo', (request, response) => {
  addTask(request.body.submittedTask)
    .then(() => {response.redirect('/todos')})
    .catch(e => console.log(e))
})

app.post('/todos/delete/:id', (request, response) => {
  deleteTask(request.params.id)
    .then(() => {response.redirect('/todos')})
    .catch(e => console.log(e))
})

app.get('/todos/update/:id', (request, response) => {
  getList()
    .then(toDos => {response.render('todos', {toDos: toDos, id: request.params.id})})
    .catch(error => console.log(error))
})

app.post('/todos/update/:id', (request, response) => {
  updateTask(request.params.id, request.body.updatedTask)
    .then(() => {response.redirect('/todos')})
    .catch(error => console.log(error))
})

app.listen(port, () => console.log('Listening on port: ' + port))
