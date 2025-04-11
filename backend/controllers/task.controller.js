const Task = require('../models/task');
const taskCtrl = {}
const tasks = require('../tasksMemoria');


//metodo para ver tareas
taskCtrl.getTasks = async (req, res) => {
    res.json(tasks);
}
//metodo para crear tareas
//metodo para crear tareas
taskCtrl.createTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                status: '0',
                msg: 'Título y descripción son obligatorios.'
            });
        }

        let completeds = false;

        if (completed !== undefined) {
            if (typeof completed === 'string') {
                completeds = completed.toLowerCase() === 'true';
            } else if (typeof completed === 'boolean') {
                completeds = completed;
            }
        }

        // Obtener el ID más alto actual
        let maxId = 0;
        for (const task of tasks) {
            const idNum = parseInt(task.id);
            if (!isNaN(idNum) && idNum > maxId) {
                maxId = idNum;
            }
        }

        const newId = (maxId + 1).toString();

        const nuevoTask = new Task(
            newId,
            title,
            description,
            completeds,
            new Date()
        );

        tasks.push(nuevoTask);

        res.status(201).json({
            status: '1',
            msg: 'Tarea guardada.',
            task: nuevoTask
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: '0',
            msg: 'Hubo un error al crear la tarea.'
        });
    }
};


//metodo para ver tarea pro su id
taskCtrl.getTask = (req, res) => {
    const { id } = req.params;  
    const task = tasks.find(task => task.id === id); 
    if (!task) {
        return res.status(404).json({ status: '0', msg: 'Tarea no encontrada' });
    }
    res.json(task); 
};


//metodo para editar tareas
taskCtrl.editTask = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, description, completed } = req.body;  

        const task = tasks.find(task => task.id === id); 

        if (!task) {
            return res.status(404).json({ status: '0', msg: 'Tarea no encontrad' });
        }
        // Actualizar la tarea con los nuevos valores, si se proporcionan
        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;

        res.json({
            status: '1',
            msg: 'Tarea actualizada',
            task
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al actualizar la tarea' });
    }
};


//metodo para eliminar tareas por su id
taskCtrl.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;  

        const taskIndex = tasks.findIndex(task => task.id === id); 
        if (taskIndex === -1) {
            return res.status(404).json({ status: '0', msg: 'Tarea no encontrada' });
        }
        tasks.splice(taskIndex, 1);  

        res.json({
            status: '1',
            msg: 'Tarea eliminada'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al eliminar la tarea' });
    }
};



module.exports = taskCtrl;