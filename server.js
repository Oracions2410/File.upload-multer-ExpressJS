const cors = require('cors')
const express = require('express')

const app = express()

const initRoutes = require('./src/routes')

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))

initRoutes(app)

const PORT = 4443

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
