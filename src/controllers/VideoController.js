const VideoSerVice = require("../services/VideoService")

const createVideo = async (req, res) => {
    try {
        console.log(req.body)
        const { description, video, tag, imageBg, liked, comment, saved, shared, userId } = req.body
        
        if(!description || !video || !userId) {
            
            return res.status(200).json({
                status: "Err",
                message: "The input of video is required"
            })
        }
        const response = await VideoSerVice.createVideo(req.body)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e,
            }
        )
    }
}

const updateVideo = async (req, res) => {
    try {
        const videoId = req.params.id
        const data = req.body

        if(!videoId) {
                return res.status(200).json({
                    status: "Err",
                    message: "The videoId is required"
                })
        }
        console.log('data ', data)
        const response = await VideoSerVice.updateVideo(videoId, data)
        return res.status(200).json(response)
    

        
    } catch(e) {
        return res.status(404).json({
            message: e,
            }
        )
    }
}

const getDetailVideo = async (req, res) => {
    try {
        const VideoId = req.params.id
        if(!VideoId) {
                return res.status(200).json({
                    status: "Err",
                    message: "The VideoId is required"
                })
        }
        
        const response = await VideoSerVice.getDetailVideo(VideoId)
        return res.status(200).json(response)
    

        
    } catch(e) {
        return res.status(404).json({
            message: e,
            }
        )
    }
}

const getAllVideo = async (req, res) => {
    try {
        const {limit, page} = req.query
        const response = await VideoSerVice.getAllVideo(Number(limit),Number(page))
        return res.status(200).json(response)
    

        
    } catch(e) {
        return res.status(404).json({
            message: e,
            }
        )
    }
}

const deleteVideo = async (req, res) => {
    try {
        const VideoId = req.params.id
        
        if(!VideoId) {
                return res.status(200).json({
                    status: "Err",
                    message: "The VideoId is required"
                })
        }
        const response = await VideoSerVice.deleteVideo(VideoId)
        return res.status(200).json(response)
    

        
    } catch(e) {
        return res.status(404).json({
            message: e,
            }
        )
    }
}

const likeVideo = async (req, res) => {
    try {
        const video = req.params.id
        const currentUser = req.body.userId
        const response = await VideoSerVice.likeVideo(video, currentUser)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e,
            }
        )
    }

}

const getRecentVideo = async (req, res) => {
    try {
        const userFollowing = req.params.id
        const response = await VideoSerVice.getRecentVideo(userFollowing)
        return res.status(200).json(response)

        
    } catch(e) {
        return res.status(404).json({
            message: e,
            }
        )
    }
}
const getARecentVideo = async (req, res) => {
    try {
        const userFollowing = req.params.id
        const response = await VideoSerVice.getARecentVideo(userFollowing)
        return res.status(200).json(response)

        
    } catch(e) {
        return res.status(404).json({
            message: e,
            }
        )
    }
}

module.exports = {
    createVideo,
    updateVideo,
    getDetailVideo,
    getAllVideo,
    deleteVideo,
    likeVideo,
    getRecentVideo,
    getARecentVideo

}