import express from "express";
import { getLiveMatches, getEndedMatches , getUpcomingMatches, getMatchDetail} from "../controllers/matchesController.js";

const router = express.Router();

router.get("/:matchId", getMatchDetail);
router.get("/live", getLiveMatches);
router.get("/ended", getEndedMatches);


// Fixtures
router.get("/upcoming", getUpcomingMatches);

export default router;

/*
http://localhost:3000/api/matches/:matchId


// get match id from these matches and pass it to [/api/matches/:matchId] to get details of a match
and to get get details about related series of that match use the deries id from the response
and pass it to [/api/series/:seriesId]


http://localhost:3000/api/matches/live
http://localhost:3000/api/matches/ended  // for recent matches
http://localhost:3000/api/matches/upcoming




*/