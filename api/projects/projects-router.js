// Write your "projects" router here!
const router = require('express').Router();
const db = require('./projects-model');

const projects = [];

router.get('/', (req, res) => {
    db.get().then((data) => {
        res.status(200).json(data);
    });
});
router.get('/:id', (req, res) => {
    let id = req.params.id;
    db.get(id).then((data) => {
        res.status(200).json(data);
    })
});

router.post('/', (req, res) => {
    const {name, description, completed} = req.body;

    if(!name || !description || !completed) {
        res.status(400).data(req);
    }
    let proj= {name:name,description:description,completed:completed};
    db.insert(proj).then((data) => {
        res.status(200).json(data);
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    const{name, description, completed} = req.body;
    if(!name || !description || completed==undefined) {
        res.status(400).json();
    }

    db.get(id)
        .then((data) => {
            if(data) {
                if(name) data.name=name;
                if(description) data.description=description;
                if(completed != undefined) data.completed=completed;
                db.update(id, data)
                    .then(res.status(200).json(data))
                    .catch((err) => console.log(err));
            } else {
                res.status(404).json();
            }
        })
});

router.delete('/:id', (req, res) => {

})

module.exports = router;