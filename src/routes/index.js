const UserRouter = require("./UserRouter")
const VideoRouter = require("./VideoRouter")

const routes = (app) => {

    app.use('/api/user', UserRouter)
    app.use('/api/video', VideoRouter)

}

module.exports = routes