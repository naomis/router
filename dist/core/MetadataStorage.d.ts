import { RequestHandler } from "express";
export declare enum MetadataKeys {
    BASE_PATH = "base_path",
    ROUTERS = "routers",
    MIDDLEWARES = "middlewares"
}
export declare enum Methods {
    GET = "get",
    POST = "post",
    DELETE = "delete",
    PATCH = "patch",
    PUT = "put"
}
export interface IRouter {
    method: Methods;
    path: string;
    handlerName: string | symbol;
    middlewares?: RequestHandler[];
}
export interface RouteOptions {
    middlewares?: RequestHandler[];
}
export interface IRouterConfig {
    apiPrefix?: string;
    controllers: Function[];
}
export declare const RouterConfig: IRouterConfig;
