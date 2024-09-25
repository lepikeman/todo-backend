const express = require('express');
const routes = express.Router();
const Todo = require('../models/todo')

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }))

routes.get('/', async (req, res) => {
    try {
        const result = await Todo.findAll();
        res.json(result)

    } catch (error) {
        console.error(error);
    }
});
routes.post('/submit', async (req, res) => {
    try {
        const result = await Todo.create({
            task: req.body.task,
            taskname: req.body.taskname,
            duedate: req.body.duedate,
            urgent: req.body.urgent,
            todo_user: req.body.todo_user
        });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error server'})
    }

})

routes.delete('/delete/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'ID invalide' });
    }
    try {
        const result = await Todo.destroy({
            where: {
                id: userId,
            }
        })
        if (result > 0) {
            res.json({message: 'Tâche supprimer avec succès'})
        } else {
            res.status(404).json({message: 'no exist'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error server'})

    }
})

routes.put('/update/:id',  async(req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const result = await Todo.update(
            {
                task: req.body.task,
                taskname: req.body.taskname,
                duedate: req.body.duedate,
                urgent: req.body.urgent,
                todo_user: req.body.todo_user},
            {
                where: {
                    id: userId,
                }
            }
        )
        if (result > 0) {
            res.json({message: "Tâche modifier avec succés"})
        } else {
            res.status(404).json({message: 'no exist'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error server'})
    }
})

module.exports = routes;