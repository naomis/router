import { Methods } from "../core/MetadataStorage"
import { methodDecoratorFactory } from "../core/MethodDecoratorFactory"

export const Post = methodDecoratorFactory(Methods.POST)
