"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const MetadataStorage_1 = require("../core/MetadataStorage");
const Controller = (basePath, middlewares) => {
    return target => {
        Reflect.defineMetadata(MetadataStorage_1.MetadataKeys.BASE_PATH, basePath, target);
        if (middlewares) {
            Reflect.defineMetadata(MetadataStorage_1.MetadataKeys.MIDDLEWARES, middlewares, target);
        }
    };
};
exports.Controller = Controller;
exports.default = exports.Controller;
//# sourceMappingURL=Controller.js.map