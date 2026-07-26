import { DEFAULT_STEPS } from "../utils/defaultSteps";
import { getReleaseStatus } from "../utils/releaseStatus";
import { releaseRepository } from "../repositories/release.repository";
import {
  CreateReleaseDto,
  UpdateReleaseDto,
} from "../interfaces/release.interface";

class ReleaseService {
  async getAllReleases() {
    const releases = await releaseRepository.findAll();

    return releases.map((release) => ({
      ...release,
      status: getReleaseStatus(release.steps),
    }));
  }

  async getReleaseById(id: number) {
    const release = await releaseRepository.findById(id);

    if (!release) {
      throw new Error("Release not found.");
    }

    return {
      ...release,
      status: getReleaseStatus(release.steps),
    };
  }

  async createRelease(data: CreateReleaseDto) {
    const release = await releaseRepository.create(
      data,
      DEFAULT_STEPS
    );

    return {
      ...release,
      status: "planned",
    };
  }

  async updateRelease(
    id: number,
    data: UpdateReleaseDto
  ) {
    await this.getReleaseById(id);

    const release = await releaseRepository.update(
      id,
      data
    );

    return {
      ...release,
      status: getReleaseStatus(release.steps),
    };
  }

  async toggleStep(
    stepId: number,
    completed: boolean
  ) {
    const step = await releaseRepository.updateStep(
      stepId,
      completed
    );

    return {
      ...step.release,
      status: getReleaseStatus(step.release.steps),
    };
  }

  async deleteRelease(id: number) {
    await this.getReleaseById(id);

    await releaseRepository.delete(id);

    return null;
  }
}

export const releaseService = new ReleaseService();
