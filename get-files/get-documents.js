const axios = require('axios').default;

const fileServiceURL = "http://localhost:9000/file";

const getAllFiles = () => {
    return axios.get(`${fileServiceURL}`)
} 

module.exports = {
    getAllFiles
}
