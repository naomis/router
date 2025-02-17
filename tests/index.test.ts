import "reflect-metadata"
import { MetadataKeys, Methods } from "../src/core/MetadataStorage"
import { Controller } from "../src/decorators/Controller"
import { Delete } from "../src/decorators/Delete"
import { Get } from "../src/decorators/Get"
import { Post } from "../src/decorators/Post"
import { Put } from "../src/decorators/Put"

describe("Controller Decorator", () => {
  it("should define metadata for base path", () => {
    @Controller("/api")
    class TestController {}

    const basePath = Reflect.getMetadata(MetadataKeys.BASE_PATH, TestController)
    expect(basePath).toBe("/api")
  })

  it("should define metadata for middlewares", () => {
    const middleware = jest.fn()

    @Controller("/api", [middleware])
    class TestController {}

    const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARES, TestController)
    expect(middlewares).toEqual([middleware])
  })
})

describe("Post Decorator", () => {
  it("should define metadata for POST method", () => {
    class TestController {
      @Post("/test")
      testMethod() {}
    }

    const routers = Reflect.getMetadata(MetadataKeys.ROUTERS, TestController)
    const route = routers.find((router: any) => router.handlerName === "testMethod")
    expect(route.method).toBe(Methods.POST)
    expect(route.path).toBe("/test")
  })
})

describe("Get Decorator", () => {
  it("should define metadata for GET method", () => {
    class TestController {
      @Get("/test")
      testMethod() {}
    }

    const routers = Reflect.getMetadata(MetadataKeys.ROUTERS, TestController)
    const route = routers.find((router: any) => router.handlerName === "testMethod")
    expect(route.method).toBe(Methods.GET)
    expect(route.path).toBe("/test")
  })
})

describe("Put Decorator", () => {
  it("should define metadata for PUT method", () => {
    class TestController {
      @Put("/test")
      testMethod() {}
    }

    const routers = Reflect.getMetadata(MetadataKeys.ROUTERS, TestController)
    const route = routers.find((router: any) => router.handlerName === "testMethod")
    expect(route.method).toBe(Methods.PUT)
    expect(route.path).toBe("/test")
  })
})

describe("Delete Decorator", () => {
  it("should define metadata for DELETE method", () => {
    class TestController {
      @Delete("/test")
      testMethod() {}
    }

    const routers = Reflect.getMetadata(MetadataKeys.ROUTERS, TestController)
    const route = routers.find((router: any) => router.handlerName === "testMethod")
    expect(route.method).toBe(Methods.DELETE)
    expect(route.path).toBe("/test")
  })
})
