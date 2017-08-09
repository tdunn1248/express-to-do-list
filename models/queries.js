const queries = require('./dbconfig')

function addTask(task) {
  return queries.one('INSERT INTO todos(task, complete) VALUES($1, false) RETURNING id, task', [task])
}

function getList() {
  return queries.any('SELECT * FROM todos')
}

function deleteTask(id) {
  return queries.none('DELETE FROM todos WHERE todos.id = $1', [id])
}

function updateTask(id, task) {
  return queries.none('UPDATE todos SET task = $2 WHERE id = $1 RETURNING id,task', [id, task])
}



module.exports = {addTask, getList, deleteTask}
