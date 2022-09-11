import { Request, Response } from "express";
import { userInfo } from "os";
import { prismaClient } from "../database/prismaClient";

export class CreatePostController {
  async create(request: Request, response: Response) {
    const {title, content, published, authorId} = request.body;

    if (!authorId) {
      response.status(400).json({ "message": "O ID do autor deve ser informado" })
    }

    const author = await prismaClient.user.findFirst({
      where: {
        id: authorId
      }
    });

    if (!author){
      response.status(400).json({ "message": "O ID do autor não existe na base" })
    }

    const post = await prismaClient.post.create({
      data: {
        title: title,
        content: content,
        published: published,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    })
    response.send(post)

  }
}