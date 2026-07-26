import { Request, Response, NextFunction } from "express";
import { releaseService } from "../services/release.service";
import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse";

class ReleaseController {
  async getAllReleases(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const releases = await releaseService.getAllReleases();

      return res.status(200).json(
        successResponse(
          "Releases fetched successfully.",
          releases
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getReleaseById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const release = await releaseService.getReleaseById(id);

      return res.status(200).json(
        successResponse(
          "Release fetched successfully.",
          release
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async createRelease(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const release = await releaseService.createRelease(req.body);

      return res.status(201).json(
        successResponse(
          "Release created successfully.",
          release
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async updateRelease(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const release = await releaseService.updateRelease(
        id,
        req.body
      );

      return res.status(200).json(
        successResponse(
          "Release updated successfully.",
          release
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async updateStep(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stepId = Number(req.params.stepId);
      const { completed } = req.body;

      const release = await releaseService.toggleStep(
        stepId,
        completed
      );

      return res.status(200).json(
        successResponse(
          "Step updated successfully.",
          release
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteRelease(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      await releaseService.deleteRelease(id);

      return res.status(200).json(
        successResponse(
          "Release deleted successfully."
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

export const releaseController = new ReleaseController();
