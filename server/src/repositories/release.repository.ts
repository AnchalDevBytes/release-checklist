import prisma from "../lib/prisma";
import {
  CreateReleaseDto,
  ReleaseStepDto,
  UpdateReleaseDto,
} from "../interfaces/release.interface";

class ReleaseRepository {
  async findAll() {
    return prisma.release.findMany({
        include: {
        steps: true,
        },
        orderBy: {
        createdAt: "desc",
        },
    });
  }

  async findById(id: number) {
    return prisma.release.findUnique({
        where: {
        id,
        },

        include: {
        steps: true,
        },
    });
}

  async create(
  data: CreateReleaseDto,
  steps: ReleaseStepDto[]
) {
  return prisma.release.create({
    data: {
      name: data.name,
      date: data.date,
      additionalInfo: data.additionalInfo,

      steps: {
        create: steps,
      },
    },

    include: {
      steps: true,
    },
  });
}

  async update(id: number, data: UpdateReleaseDto) {
    return prisma.release.update({
      where: {
        id,
      },
      data : {
        additionalInfo: data.additionalInfo
      },
      include:  {
        steps: true
      }
    });
  }

    async updateStep(
        stepId: number,
        completed: boolean
        ) {
        return prisma.releaseStep.update({
            where: {
                id: stepId,
            },

            data: {
                completed,
            },
            include: {
                release : {
                    include: {
                        steps: true,
                    }
                }
            }
        });
    }

    async delete(id: number) {
        return prisma.release.delete({
        where: {
            id,
        },
        });
    }
}

export const releaseRepository = new ReleaseRepository();
