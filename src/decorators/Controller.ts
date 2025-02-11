import { RequestHandler } from "express"
import { MetadataKeys } from "../core/MetadataStorage"
import { ClassDecorator } from "../utils/types"

export const Controller = (basePath: string, middlewares?: RequestHandler[]): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target)
    if (middlewares) {
      Reflect.defineMetadata(MetadataKeys.MIDDLEWARES, middlewares, target)
    }
  }
}

export default Controller
