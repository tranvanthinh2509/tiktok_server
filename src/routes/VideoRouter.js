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
router.post('/recent', videoController.getRecentVideo)
router.post('/a_recent', videoController.getARecentVideo)
router.get('/videoOfMe/:id', videoController.getVideoOfMe)
module.exports = router