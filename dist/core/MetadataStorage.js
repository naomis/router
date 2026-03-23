"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterConfig = exports.Methods = exports.MetadataKeys = void 0;
var MetadataKeys;
(function (MetadataKeys) {
    MetadataKeys["BASE_PATH"] = "base_path";
    MetadataKeys["ROUTERS"] = "routers";
    MetadataKeys["MIDDLEWARES"] = "middlewares";
})(MetadataKeys || (exports.MetadataKeys = MetadataKeys = {}));
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["DELETE"] = "delete";
    Methods["PATCH"] = "patch";
    Methods["PUT"] = "put";
})(Methods || (exports.Methods = Methods = {}));
exports.RouterConfig = {
    apiPrefix: "/api",
    controllers: [],
};
//# sourceMappingURL=MetadataStorage.js.map