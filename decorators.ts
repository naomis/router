import { RequestHandler } from "express"

export enum MetadataKeys {
  BASE_PATH = "base_path",
  ROUTERS = "routers",
}

export enum Methods {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PATCH = "patch",
}
export interface IRouter {
  method: Methods
  path: string
  handlerName: string | symbol
  middlewares?: RequestHandler[]
}

interface RouteOptions {
  middlewares?: RequestHandler[]
}

const methodDecoratorFactory = (method: Methods) => {
  return (path: string, options: RouteOptions = {}): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor
      const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass) ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) : []
      routers.push({
        method,
        path,
        handlerName: propertyKey,
        middlewares: options.middlewares || [],
      })
      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass)
    }
  }
}

const Controller = (basePath: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, "/api" + basePath, target)
  }
}

export default Controller

export const Get = methodDecoratorFactory(Methods.GET)
export const Post = methodDecoratorFactory(Methods.POST)
export const Delete = methodDecoratorFactory(Methods.DELETE)
export const Patch = methodDecoratorFactory(Methods.PATCH)
