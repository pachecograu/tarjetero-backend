var exepciones = function (res, code, text) {
    // console.log(code, text);
    switch (code) {
        case 400:
            return res.status(code).json({
                status: 'Bad request',
                error: text
            });
            break;
        case 401:
            return res.status(code).json({
                status: 'Unauthorized',
                error: text
            });
            break;
        case 404:
            return res.status(code).json({
                status: 'Not found',
                error: text + ' no encontrado(s)'
            });
            break;
        case 500:
            return res.status(code).json({
                status: 'Error internal server',
                error: text
            });
            break;
        default:
            break;
    }
};

module.exports = exepciones;