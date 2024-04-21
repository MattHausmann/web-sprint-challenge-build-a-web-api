// Write your "projects" router here!
const router = require('express').Router();
const db = require('./projects-model');


router.get('/', (req, res) => {
    db.get().then((data) => {
        res.status(200).json(data);
    });
});
router.get('/:id', (req, res) => {
    let id = req.params.id;
    db.get(id).then((data) => {
        res.status(data?200:404).json(data);
    })
});

router.get('/:id/actions', (req, res) => {
    let id=req.params.id;
    db.get(id).then((data) => {
        console.log(data);
        if(data){
            res.status(200).json(data.actions);
        }else {
            res.status(404).json();
        }
    })
    .catch((err) => res.status(404));
})

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

    db.update(id, req.body)
        .then((data) => data?res.status(200).json(data):res.status(404).json(data))
        .catch((err) => res.status(404));
});

router.delete('/:id', (req, res) => {
    let id=req.params.id;
    db.remove(id)
        .then((data) => {
            res.status(data?200:404).json();
        })
})

module.exports = router;