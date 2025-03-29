const express = require('express');
const { playerController } = require('../Controllers');
const { authenticateJWT } = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/addplayer',authenticateJWT,playerController.addingPlayer);
router.get('/allplayer',authenticateJWT,playerController.alladdedPlayer);
router.get('/getplayerbyid',authenticateJWT,playerController.PlayerById);
router.put('/updateplayer/:id',authenticateJWT,playerController.UpdatingPlayer);
router.delete('/deleteplayer/:id',authenticateJWT,playerController.DeletedPlayer);
router.put('/changeprice/:id',authenticateJWT,playerController.ChangedPrice);
module.exports = router;
