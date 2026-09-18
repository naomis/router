import { Application, RequestHandler } from "express"
import "reflect-metadata"
import { IRouter, MetadataKeys, RouterConfig } from "./MetadataStorage"

type ControllerClass = { new (): any }

const joinPaths = (...segments: string[]): string => {
  const joined = segments
    .filter(segment => segment.length > 0)
    .join("/")
    .replace(/\/+/g, "/")

  return joined.startsWith("/") ? joined : `/${joined}`
}

export class RouterRegistry {
  static registerRoutes(app: Application, options: { apiPrefix?: string; controllers: ControllerClass[] }) {
    const apiPrefix = options.apiPrefix || RouterConfig.apiPrefix || ""

    options.controllers.forEach(controller => {
      const controllerInstance = new controller()
      const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controller) || ""
      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controller) || []
      const controllerMiddlewares: RequestHandler[] = Reflect.getMetadata(MetadataKeys.MIDDLEWARES, controller) || []

      routers.forEach(route => {
        const { method, path, handlerName, middlewares: routeMiddlewares = [] } = route
        const handler = controllerInstance[handlerName].bind(controllerInstance)
        const allMiddlewares = [...controllerMiddlewares, ...routeMiddlewares]
        const fullPath = joinPaths(apiPrefix, basePath, path)

        const wrappedHandler: RequestHandler = (req, res, next) => {
          Promise.resolve(handler(req, res, next)).catch(next)
        }

        if (allMiddlewares.length > 0) {
          app[method](fullPath, ...allMiddlewares, wrappedHandler)
        } else {
          app[method](fullPath, wrappedHandler)
        }
      })
    })
  }
}
