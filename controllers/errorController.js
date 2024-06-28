const unauthorized = (req, res) => {
    res.status(401).render('unauthorized');
}

const notFound = (req, res) => {
    res.status(404).render('404')
}

module.exports = {
    unauthorized, notFound
}