import { Methods, RouteOptions } from "./MetadataStorage";
export declare const methodDecoratorFactory: (method: Methods) => (path: string, options?: RouteOptions) => MethodDecorator;
