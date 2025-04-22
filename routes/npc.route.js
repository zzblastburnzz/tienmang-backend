
const express = require('express');
const router = express.Router();
const { getAllNPCs, getNPCById, sendFriendRequest } = require('../controllers/npc.controller');

router.get('/', getAllNPCs);
router.get('/:id', getNPCById);
router.post('/:id/friend', sendFriendRequest);

module.exports = router;
