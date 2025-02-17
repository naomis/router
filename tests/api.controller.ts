import express from "express"
import "reflect-metadata"
import { IRouter, MetadataKeys } from "../src/core/MetadataStorage"
import Controller from "../src/decorators/Controller"
import { Delete } from "../src/decorators/Delete"
import { Get } from "../src/decorators/Get"
import { Post } from "../src/decorators/Post"
import { Put } from "../src/decorators/Put"

const app = express()
app.use(express.json())

@Controller("/api")
class TestController {
  @Post("/post")
  postMethod(req: express.Request, res: express.Response) {
    res.status(200).send("Post method")
  }

  @Get("/get")
  getMethod(req: express.Request, res: express.Response) {
    res.status(200).send("Get method")
  }

  @Put("/put")
  putMethod(req: express.Request, res: express.Response) {
    res.status(200).send("Put method")
  }

  @Delete("/delete")
  deleteMethod(req: express.Request, res: express.Response) {
    res.status(200).send("Delete method")
  }
}

// Dynamically register routes
const controllers: Function[] = [TestController]
controllers.forEach(controller => {
  const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH, controller)
  const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controller)
  routers.forEach(router => {
    const { method, path, handlerName } = router
    const handler = controller.prototype[handlerName]
    const fullPath = `${basePath}${path}`
    app[method](fullPath, handler)
  })
})

export default app
