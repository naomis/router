import { Application } from "express";
import "reflect-metadata";
type ControllerClass = {
    new (): any;
};
export declare class RouterRegistry {
    static registerRoutes(app: Application, options: {
        apiPrefix?: string;
        controllers: ControllerClass[];
    }): void;
}
export {};
