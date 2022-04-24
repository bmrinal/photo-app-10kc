const validator = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], {
            abortEarly: false, errors: {
                wrap: {
                    label: ''
                }
            }
        });
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message)
            console.error("error", message);
            res.status(422).json({ errors: message })
        }
    }
}
module.exports = validator;