import { Router } from "express";
import { releaseController } from "../controllers/release.controller";

const router = Router();

router.get("/", releaseController.getAllReleases);

router.get("/:id", releaseController.getReleaseById);

router.post("/", releaseController.createRelease);

router.patch("/:id", releaseController.updateRelease);

router.patch("/steps/:stepId", releaseController.updateStep);

router.delete("/:id", releaseController.deleteRelease);

export default router;
