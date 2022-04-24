const authorize = (req, res, next) => {
  if (!req.token) {
    return res.status(403).send({ error: "A token is required for authentication" })
  }
  if (!req.user) {
    return res.status(401).send({ error: "Invalid Token" })
  }
  return next()
}

module.exports = authorize