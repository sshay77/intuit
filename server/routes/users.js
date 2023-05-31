const router = require('express').Router();

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const user = await fetch('http://localhost:8081/users/' + id).then(res=>res.json());
        res.send({
            success: true,
            data: user
        });
    } catch (e) {
        res.send({
            message: e.message,
            success: false
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, family } = req.body;
        const { authorization } = req.headers;
        const newUser = new User({ name, family });
        await newUser.save();
        res.send({
            name,
            family,
            authorization,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;