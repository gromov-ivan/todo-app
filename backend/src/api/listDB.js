const express = require('express');
const router = express.Router();
const Task = require('./task')

const list = [];

router.get('/', async (req, res) => {
    const list = await Task.find();
    res.status(200).json(list);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = list.find((m) => m.id === Number(id));
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
});

router.post('/', async (req, res) => {
    const task = await Task.create({
        id: req.body.id,
        name: req.body.name
    })
    await task.save();
});
  
router.patch('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(400)
        throw new Error('Task not found');
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedTask);
});
  
router.delete('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(400)
        throw new Error('Task not found')
    }
    await task.remove();

    res.status(200).json({ id: req.params.id });
});

router.delete('/', async(req, res) => {
    const task = await Task.find();
    if(!task){
        res.status(400)
        throw new Error('Task not found')
    }
    task.map((item)=>item.remove());

    res.status(200).json({message: 'All removed'});
});
  
module.exports = router;