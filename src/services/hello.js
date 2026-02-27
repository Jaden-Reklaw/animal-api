exports.main = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello, I will read from the ${process.env.TABLE_NAME}!` })
    };
}