module.exports = () => {

    const isOnline = async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send({
            status: true
        })
    };

    return {
        isOnline
    };

}