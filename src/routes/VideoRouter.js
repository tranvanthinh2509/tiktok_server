const express = require("express");
const router = express.Router()
const videoController = require('../controllers/VideoController')
const { authMiddleWare} = require("../middleware/authMiddleware");

router.post('/create', videoController.createVideo)
router.put('/update/:id', authMiddleWare, videoController.updateVideo)
router.get('/detail/:id', videoController.getDetailVideo)
router.get('/getAll', videoController.getAllVideo)
router.delete('/delete/:id',authMiddleWare, videoController.deleteVideo)
router.put('/like/:id', videoController.likeVideo)
router.get('/recent/:id', videoController.getRecentVideo)
router.get('/a_recent/:id', videoController.getARecentVideo)
module.exports = router