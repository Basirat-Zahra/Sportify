import express from 'express';
import { getTeamPlayers, getPlayerInfo } from '../controllers/playersController.js';

const router = express.Router();

router.get('country/:countryName', getTeamPlayers);
router.get('/player/:playerId', getPlayerInfo);

export default router;


/*

For now display players by countries using ['/api/players/country/:country'] 
in the teams page



*/