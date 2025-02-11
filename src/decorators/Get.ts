import { Methods } from "../core/MetadataStorage"
import { methodDecoratorFactory } from "../core/MethodDecoratorFactory"

export const Get = methodDecoratorFactory(Methods.GET)
