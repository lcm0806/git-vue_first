const router = require('express').Router();
const tacticsController = require('./_controller/tacticsController');


// create
router.post("/", async (req, res) => {
    const result = await tacticsController.create(req);
    res.json(result);
    });


// list
router.get('/', async (req,res)=>{
    const result = await tacticsController.list(req);
    res.json(result);
})


// update
router.put('/:id', async (req,res)=>{
    const result = await tacticsController.update(req);
    res.json(result);
})

// delete
router.delete('/:id', async (req,res)=>{
    const result = await tacticsController.delete(req);
    res.json(result);
})

// truncate, dummy insert
router.post('/reset', async (req,res)=>{
    const result = await tacticsController.reset(req);
    res.json(result);
})

module.exports = router;