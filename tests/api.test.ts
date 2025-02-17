import request from "supertest"
import app from "./api.controller"

describe("API Endpoints", () => {
  it("should handle POST requests", async () => {
    const response = await request(app).post("/api/post").send()
    expect(response.status).toBe(200)
    expect(response.text).toBe("Post method")
  })

  it("should handle GET requests", async () => {
    const response = await request(app).get("/api/get")
    expect(response.status).toBe(200)
    expect(response.text).toBe("Get method")
  })

  it("should handle PUT requests", async () => {
    const response = await request(app).put("/api/put").send()
    expect(response.status).toBe(200)
    expect(response.text).toBe("Put method")
  })

  it("should handle DELETE requests", async () => {
    const response = await request(app).delete("/api/delete").send()
    expect(response.status).toBe(200)
    expect(response.text).toBe("Delete method")
  })
})
