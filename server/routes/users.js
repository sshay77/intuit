const router = require('express').Router();

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await fetch('http://localhost:8081/users/' + id)
            .then(res => res.json());

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

module.exports = router;