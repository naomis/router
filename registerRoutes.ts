import express, { Application, Handler } from "express"
import { IRouter, MetadataKeys } from "../utils/decorators"
import "reflect-metadata"
function registerRoutes(app: Application) {
  const info: Array<{ method: string; api: string; handler: string }> = []

  const controllers = []

  controllers.forEach(ControllerClass => {
    const controllerInstance: { [handleName: string]: Handler } = new ControllerClass() as any
    const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, ControllerClass)
    const routes: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, ControllerClass)
    const router = express.Router()
    routes.forEach(({ method, path, handlerName, middlewares }) => {
      router[method](path, ...(middlewares ?? []), controllerInstance[String(handlerName)].bind(controllerInstance))
      info.push({
        method: method.toLocaleUpperCase(),
        api: `${basePath + path}`,
        handler: `${ControllerClass.name}.${String(handlerName)}`,
      })
    })
    app.use(basePath, router)
  })
  console.table(info)
}
export default registerRoutes
