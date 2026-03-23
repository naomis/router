import { RequestHandler } from "express";
import { ClassDecorator } from "../utils/types";
export declare const Controller: (basePath: string, middlewares?: RequestHandler[]) => ClassDecorator;
export default Controller;
