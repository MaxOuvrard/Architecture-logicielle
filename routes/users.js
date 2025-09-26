const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController').default;

router.post('/', (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.list(req, res));
router.get('/:id', (req, res) => controller.get(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.remove(req, res));

module.exports = router;
