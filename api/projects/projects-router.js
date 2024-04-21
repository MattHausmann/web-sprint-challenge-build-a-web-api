// Write your "projects" router here!
const express = require('express');
const server = express();
server.use(express.json());
const router = express.Router();

const db = require('./projects-model');

const projects = [];

router.get('/', (req, res) => {
    console.log("about to get data");
    db.get(projects).then((data) => {
        res.status(200).json(data?data:[]);
    });
    console.log("should still be getting data");
});

router.post('/', (req, res) => {
    console.log(req);
    let projName = req.body.name;
    let projDesc = req.body.description;
    let projCompleted = req.body.completed;

    if(!projName || !projDesc || !projCompleted) {
        res.statusCode(400);
    }
    let proj= {name:projName,desc:projDesc,completed:projCompleted};
    db.insert(proj).then((data) => {
        res.status(200).json(data);
    })
});

module.exports = router;