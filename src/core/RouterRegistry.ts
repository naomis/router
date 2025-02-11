import { Application, RequestHandler } from "express"
import "reflect-metadata"
import { IRouter, MetadataKeys } from "./MetadataStorage"

export class RouterRegistry {
  static registerRoutes(app: Application, controllers: any[]) {
    controllers.forEach(controller => {
      const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH, controller)
      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controller) || []
      const controllerMiddlewares: RequestHandler[] = Reflect.getMetadata(MetadataKeys.MIDDLEWARES, controller) || []
      routers.forEach(route => {
        const { method, path, handlerName, middlewares: routeMiddlewares = [] } = route
        const handler = controller.prototype[handlerName]
        const allMiddlewares = [...controllerMiddlewares, ...routeMiddlewares]
        if (allMiddlewares.length > 0) {
          app[method](basePath + path, ...allMiddlewares, handler)
        } else {
          app[method](basePath + path, handler)
        }
      })
    })
  }
}
