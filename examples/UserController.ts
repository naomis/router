import express, { Request, Response } from "express"
import { Controller, Delete, Get, Post, Put } from "../src"

const controllerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("Middleware de contrôleur exécuté")
  next()
}

const routeMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("Middleware de route exécuté")
  next()
}

@Controller("/users", [controllerMiddleware]) // Middleware appliqué à toutes les routes du contrôleur
export class UserController {
  @Get("/")
  getUsers(req: Request, res: Response) {
    res.send("Get all users")
  }

  @Post("/", { middlewares: [routeMiddleware] }) // Middleware appliqué uniquement à cette route
  createUser(req: express.Request, res: express.Response) {
    res.send("Create a new user")
  }

  @Delete("/:id")
  deleteUser(req: express.Request, res: express.Response) {
    res.send(`Delete user with id ${req.params.id}`)
  }

  @Put("/:id")
  updateUser(req: express.Request, res: express.Response) {
    res.send(`Update user with id ${req.params.id}`)
  }
}
