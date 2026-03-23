"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterRegistry = exports.Put = exports.Post = exports.Get = exports.Delete = exports.Controller = void 0;
const RouterRegistry_1 = require("./core/RouterRegistry");
Object.defineProperty(exports, "RouterRegistry", { enumerable: true, get: function () { return RouterRegistry_1.RouterRegistry; } });
const Controller_1 = require("./decorators/Controller");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return Controller_1.Controller; } });
const Delete_1 = require("./decorators/Delete");
Object.defineProperty(exports, "Delete", { enumerable: true, get: function () { return Delete_1.Delete; } });
const Get_1 = require("./decorators/Get");
Object.defineProperty(exports, "Get", { enumerable: true, get: function () { return Get_1.Get; } });
const Post_1 = require("./decorators/Post");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return Post_1.Post; } });
const Put_1 = require("./decorators/Put");
Object.defineProperty(exports, "Put", { enumerable: true, get: function () { return Put_1.Put; } });
//# sourceMappingURL=index.js.map