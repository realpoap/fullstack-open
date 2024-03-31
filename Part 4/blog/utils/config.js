require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const TEST_MONGO_URI = process.env.TEST_MONGO_URI

module.exports = {
    PORT,
    MONGO_URI,
    TEST_MONGO_URI
}