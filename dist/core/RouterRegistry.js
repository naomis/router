"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterRegistry = void 0;
require("reflect-metadata");
const MetadataStorage_1 = require("./MetadataStorage");
class RouterRegistry {
    static registerRoutes(app, options) {
        const apiPrefix = options.apiPrefix || MetadataStorage_1.RouterConfig.apiPrefix;
        options.controllers.forEach(controller => {
            const controllerInstance = new controller();
            const basePath = Reflect.getMetadata(MetadataStorage_1.MetadataKeys.BASE_PATH, controller);
            const routers = Reflect.getMetadata(MetadataStorage_1.MetadataKeys.ROUTERS, controller) || [];
            const controllerMiddlewares = Reflect.getMetadata(MetadataStorage_1.MetadataKeys.MIDDLEWARES, controller) || [];
            routers.forEach(route => {
                const { method, path, handlerName, middlewares: routeMiddlewares = [] } = route;
                const handler = controllerInstance[handlerName].bind(controllerInstance);
                const allMiddlewares = [...controllerMiddlewares, ...routeMiddlewares];
                const fullPath = `${apiPrefix}${basePath}${path}`;
                if (allMiddlewares.length > 0) {
                    app[method](fullPath, ...allMiddlewares, handler);
                }
                else {
                    app[method](fullPath, handler);
                }
            });
        });
    }
}
exports.RouterRegistry = RouterRegistry;
//# sourceMappingURL=RouterRegistry.js.map