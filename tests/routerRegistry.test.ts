import express from "express"
import "reflect-metadata"
import request from "supertest"
import { Controller } from "../src/decorators/Controller"
import { Get } from "../src/decorators/Get"
import { RouterRegistry } from "../src/core/RouterRegistry"

describe("RouterRegistry - path joining", () => {
  it("should not produce double slashes when basePath has a trailing slash", async () => {
    @Controller("/users/")
    class TestController {
      @Get("/")
      getUsers(req: express.Request, res: express.Response) {
        res.status(200).send("users list")
      }
    }

    const app = express()
    RouterRegistry.registerRoutes(app, { apiPrefix: "/api/", controllers: [TestController] })

    const response = await request(app).get("/api/users")
    expect(response.status).toBe(200)
    expect(response.text).toBe("users list")
  })
})

describe("RouterRegistry - async error handling", () => {
  it("should forward rejected promises from async handlers to Express error handling", async () => {
    @Controller("/failing")
    class TestController {
      @Get("/")
      async getUsers() {
        throw new Error("boom")
      }
    }

    const app = express()
    RouterRegistry.registerRoutes(app, { controllers: [TestController] })
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(500).send(`handled: ${err.message}`)
    })

    const response = await request(app).get("/api/failing")
    expect(response.status).toBe(500)
    expect(response.text).toBe("handled: boom")
  })
})
