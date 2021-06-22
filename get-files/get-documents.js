const axios = require('axios').default;

const fileServiceURL = "http://localhost:4040/file";

const getAllFiles = () => {
    return axios.get(`${fileServiceURL}`)
} 

module.exports = {
    getAllFiles
}
