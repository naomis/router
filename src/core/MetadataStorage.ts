import { RequestHandler } from "express";

export enum MetadataKeys {
    BASE_PATH = "base_path",
    ROUTERS = "routers",
    MIDDLEWARES = "middlewares", // Nouvelle clé pour les middlewares du contrôleur
}

export enum Methods {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PATCH = "patch",
  PUT = "put",
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