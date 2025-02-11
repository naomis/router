import { Methods } from "../core/MetadataStorage"
import { methodDecoratorFactory } from "../core/MethodDecoratorFactory"

export const Put = methodDecoratorFactory(Methods.PUT)
