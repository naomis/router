// import { MethodDecorator } from "../utils/types"
import { IRouter, MetadataKeys, Methods, RouteOptions } from "./MetadataStorage"

export const methodDecoratorFactory = (method: Methods) => {
  return (path: string, options: RouteOptions = {}): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor
      const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
        ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
        : []
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
