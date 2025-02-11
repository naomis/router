import express from "express"
import { RouterRegistry } from "../src"
import { UserController } from "./UserController"

const app = express()
app.use(express.json())

RouterRegistry.registerRoutes(app, [UserController])

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
