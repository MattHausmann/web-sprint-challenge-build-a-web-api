// Write your "actions" router here!
const router = require('express').Router();
const db = require('./actions-model');
const projDb = require('../projects/projects-model');

router.get('/', (req, res) => {
    db.get().then((data) => res.status(200).json(data));
})

router.get('/:id', (req, res) => {
    let id = req.params.id; 
    db.get(id).then((data) => res.status(data?200:404).json(data))
});

router.post('/', (req, res) => {
    const {project_id, description, notes, completed} = req.body;

    if(!project_id || !description || !notes || completed==undefined) {
        res.status(400).json();
        return;
    }

    projDb.get(project_id)
        .then((data) => {if(!data) return;})
    let action={project_id:project_id,description:description,notes:notes,completed:completed}
    db.insert(action).then((data) => {
        res.status(200).json(data);
    })
});

router.put('/:id', (req, res) => {
    let id=req.params.id;
    const {project_id, description, notes, completed} = req.body;
    if(!project_id || !description || !notes || completed==undefined) {
        res.status(400).json();
        return;
    }
    projDb.get(project_id)
        .then((data) => {
            if(!data) return;
        })

    let action={project_id:project_id,description:description,notes:notes,completed:completed}
    db.update(id, action)
     .then((data) => data?res.status(200).json(data):res.status(404).json(data))
     .catch((err) => res.status(404).json(err));
});

router.delete('/:id', (req, res) => {
    let id=req.params.id;
    db.remove(id)
        .then((data) => {
            res.status(data?200:404).json();
        })
})
module.exports = router;