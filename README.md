![Tests](https://github.com/naomis/router/actions/workflows/tests.yml/badge.svg)

# Naomis Router

Router est un package Node.js permettant d’utiliser les décorateurs TypeScript avec Express.js pour une gestion plus intuitive des routes.

https://deepwiki.com/naomis/router/2-getting-started

## Installation

Pour installer le projet, clonez le dépôt et exécutez la commande suivante :

```bash
npm install git+https://github.com/naomis/router.git
```

## Utilisation

Pour utiliser express-decorators, importez les décorateurs dans vos fichiers de contrôleur et définissez vos routes comme suit :

### Controlleur

```typescript
import { Controller, Get, Post, Delete, Put } from "@naomis/router";
import { authMiddleware } from "../middleware/auth";
import { routeMiddleware } from "../middleware/routeMiddleware";
import { uploadSingleFile } from "../src/uploadSingleFile";

@Controller("/users", [authMiddleware]) // Middleware appliqué à toutes les routes du contrôleur
class UserController {
  @Get("/")
  getUsers(req: express.Request, res: express.Response) {
    res.send("Get all users");
  }

  @Post("/", { middlewares: [routeMiddleware, uploadSingleFile] }) // Middleware appliqué uniquement à cette route avec multer config
  createUser(req: express.Request, res: express.Response) {
    res.send("Create a new user");
  }

  @Delete("/:id")
  deleteUser(req: express.Request, res: express.Response) {
    res.send(`Delete user with id ${req.params.id}`);
  }

  @Put("/:id")
  updateUser(req: express.Request, res: express.Response) {
    res.send(`Update user with id ${req.params.id}`);
  }
}
```

### Server

```typescript
import express from "express";
import { RouterRegistry } from "@naomis/router";
import { UserController } from "src/UserController";

const app = express();
app.use(express.json());

RouterRegistry.registerRoutes(app, {
  apiPrefix: "/api", // <-- Prefixe de l'api par defaut "/api"
  controllers: [UserController],
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Tests

Pour exécuter les tests, utilisez la commande suivante :

```
npx jest
```

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une demande de tirage pour toute amélioration ou correction de bogue.

-

## License

Ce projet est sous licence MIT.
