import { Application, RequestHandler } from "express"
import "reflect-metadata"
import { IRouter, MetadataKeys, RouterConfig } from "./MetadataStorage"

type ControllerClass = { new (): any }

export class RouterRegistry {
  static registerRoutes(app: Application, options: { apiPrefix?: string; controllers: ControllerClass[] }) {
    const apiPrefix = options.apiPrefix || RouterConfig.apiPrefix

    options.controllers.forEach(controller => {
      const controllerInstance = new controller()
      const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH, controller)
      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controller) || []
      const controllerMiddlewares: RequestHandler[] = Reflect.getMetadata(MetadataKeys.MIDDLEWARES, controller) || []

      routers.forEach(route => {
        const { method, path, handlerName, middlewares: routeMiddlewares = [] } = route
        const handler = controllerInstance[handlerName].bind(controllerInstance)
        const allMiddlewares = [...controllerMiddlewares, ...routeMiddlewares]
        const fullPath = `${apiPrefix}${basePath}${path}`

        if (allMiddlewares.length > 0) {
          app[method](fullPath, ...allMiddlewares, handler)
        } else {
          app[method](fullPath, handler)
        }
      })
    })
  }
}
