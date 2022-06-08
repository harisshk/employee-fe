const prod = {
    url: {
        //  BASE_URL: 'https://data-table-bc.herokuapp.com'
    }
}
const dev = {
    url: {
        BASE_URL: 'http://localhost:5050'
    }
}
const config = process.env.NODE_ENV === 'development' ? dev : prod;

module.exports = {
    employeeServiceUrl: `${config?.url?.BASE_URL}/employee`,
}