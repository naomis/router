import { Methods } from "../core/MetadataStorage"
import { methodDecoratorFactory } from "../core/MethodDecoratorFactory"

export const Patch = methodDecoratorFactory(Methods.PATCH)
