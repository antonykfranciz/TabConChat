const response = (status, message, data) => {
    let body = {
        status: status,
        message: message,
        data: data
    }
    return body;
}

module.exports = {
    response: response
};