import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateProfileController {
  async create(request: Request, response: Response) {
    const { bio, userId } = request.body;

    if (!userId) {
      response.status(400).json({ "message": "O ID do usuário deve ser informado" })
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId
      }
    });

    if (!user) {
      response.status(400).json({ "message": "O ID do usuário não existe na base" })
    } else {
      const profile = await prismaClient.profile.create({
        data: {
          bio: bio,
          user: {
            connect: {
              id: userId
            }
          }
        }
      })
      
      response.send(profile)
    }
  }
}