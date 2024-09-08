async function errorHandler(error, req, res, next) {
    console.log(error, '<<<<<<<<<<<<< INI ERROR');

    try {
        let status = 500
        let message = 'Error on the internal server'

        switch (error.name) {
            case 'InvalidCredentials':
                status = 401
                message = 'Invalid email or password'
                break;
            case 'ForbiddenError':
                status = 403
                message = 'Access is not allowed or not your role'
                break;
            case 'SequelizeValidationError':
                message = error.errors.map(el => ({ message: el.message }))
                status = 400
                break;
            case 'NotFoundError':
                status = 404
                message = 'Not found'
                break;
            case 'UnauthorizedError':
                status = 401
                message = 'Unauthorized: email or password error'
                break;
            case 'JsonWebTokenError':
                status = 401
                message = 'You are not logged in'
                break;
        }
        res.status(status).json({ error: message })
    } catch (error) {
        next(error)
    }

}

module.exports = errorHandler