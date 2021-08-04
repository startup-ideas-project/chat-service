const axios = require('axios').default;

const commentServiceURL = "http://localhost:4120/comment";

const getComments = () => {
    return axios.get(`${commentServiceURL}`)
} 

module.exports = {
    getComments
}
