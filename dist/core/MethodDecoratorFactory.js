"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodDecoratorFactory = void 0;
// import { MethodDecorator } from "../utils/types"
const MetadataStorage_1 = require("./MetadataStorage");
const methodDecoratorFactory = (method) => {
    return (path, options = {}) => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;
            const routers = Reflect.hasMetadata(MetadataStorage_1.MetadataKeys.ROUTERS, controllerClass)
                ? Reflect.getMetadata(MetadataStorage_1.MetadataKeys.ROUTERS, controllerClass)
                : [];
            routers.push({
                method,
                path,
                handlerName: propertyKey,
                middlewares: options.middlewares || [],
            });
            Reflect.defineMetadata(MetadataStorage_1.MetadataKeys.ROUTERS, routers, controllerClass);
        };
    };
};
exports.methodDecoratorFactory = methodDecoratorFactory;
//# sourceMappingURL=MethodDecoratorFactory.js.map