const mongoose = require('mongoose')
const {Router} = require('express')
const postController = require('./postController.js')
const router = Router()

router.post('/posts', postController.create )
router.get('/posts', postController.getAll )
router.get('/data/:currency', postController.data)
router.get('/posts/:id',postController.getOne )
router.put('/posts', postController.update )
router.delete('/posts/:id',postController.delete )

module.exports = router;