const express = require('express');
const router = express.Router();
const tasks = [
    {
        id: 1,
        name: 'Feed the dog'
    },
    {
        id: 2,
        name: 'Repair the car'
    },
    {
        id: 3,
        name: 'Clean the apartment'
    }
];
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find((m) => m.id === Number(id));
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
});

router.post('/', (req, res) => {
    const { id, name } = req.body;
    tasks.push({ id, name });
    res.status(201).json({ message: 'Added' });
});
  
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const index = tasks.findIndex((m) => m.id === Number(id));
    const updatedTask = {
      id: Number(id),
      name,
    };
    tasks[index] = updatedTask;
    res.status(200).json({ message: 'Updated' });
});
  
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskToDelete = tasks.findIndex((m) => m.id === Number(id));
    tasks.splice(taskToDelete, 1);
    res.status(200).json({ message: 'Deleted' });
});
  
module.exports = router;