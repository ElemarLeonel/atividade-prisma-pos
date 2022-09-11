import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateUserController {
  async create(request: Request, response: Response) {
    const {email, name} = request.body;

    const user = await prismaClient.user.create({
      data: {
        email,
        name,
      },
    });

    return response.json(user);
  }
}