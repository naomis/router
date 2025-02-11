import { Methods } from "../core/MetadataStorage"
import { methodDecoratorFactory } from "../core/MethodDecoratorFactory"

export const Delete = methodDecoratorFactory(Methods.DELETE)
