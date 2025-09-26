import request from "supertest";
import express from "express";
import bodyParser from "body-parser";

import { UserController } from "../presentation/controllers/UserController";
import { CreateUserHandler } from "../application/handlers/command-handler/CreateUserHandler";
import { GetUserHandler } from "../application/handlers/query-handler/GetUserHandler";
import { UpdateUserHandler } from "../application/handlers/command-handler/UpdateUserHandler";
import { DeleteUserHandler } from "../application/handlers/command-handler/DeleteUserHandler";

import { CreateUserCommand } from "../application/command/CreateUserCommand";
import { UpdateUserCommand } from "../application/command/UpdateUserCommand";
import { DeleteUserCommand } from "../application/command/DeleteUserCommand";
import { GetUserQuery } from "../application/queries/GetUserQuery";

// 🟢 Création des mocks (Handlers simulés)
const mockCreateUserHandler = { execute: jest.fn() } as unknown as CreateUserHandler;
const mockGetUserHandler = { execute: jest.fn() } as unknown as GetUserHandler;
const mockUpdateUserHandler = { execute: jest.fn() } as unknown as UpdateUserHandler;
const mockDeleteUserHandler = { execute: jest.fn() } as unknown as DeleteUserHandler;

// 🟢 Injection des mocks dans le contrôleur
const userController = new UserController(
  mockCreateUserHandler,
  mockGetUserHandler,
  mockUpdateUserHandler,
  mockDeleteUserHandler
);

// 🟢 Configuration Express
const app = express();
app.use(bodyParser.json());
app.post("/users", (req, res) => userController.create(req, res));
app.get("/users/:id", (req, res) => userController.get(req, res));
app.put("/users", (req, res) => userController.update(req, res));
app.delete("/users/:id", (req, res) => userController.delete(req, res));

// 🟢 Données mock
const mockUser = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "123456789",
  profile: "STANDARD",
};

describe("UserController CQRS", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 📌 CREATE
  describe("POST /users", () => {
    it("should create a user", async () => {
      (mockCreateUserHandler.execute as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).post("/users").send(mockUser);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(mockUser);
      expect(mockCreateUserHandler.execute).toHaveBeenCalledWith(
        expect.any(CreateUserCommand)
      );
    });

    it("should handle errors when creating a user", async () => {
      (mockCreateUserHandler.execute as jest.Mock).mockRejectedValue(new Error("fail"));

      const res = await request(app).post("/users").send(mockUser);

      expect(res.status).toBe(500);
    });
  });

  // 📌 READ
  describe("GET /users/:id", () => {
    it("should return a user if found", async () => {
      (mockGetUserHandler.execute as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).get("/users/1");

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(mockUser);
      expect(mockGetUserHandler.execute).toHaveBeenCalledWith(
        expect.any(GetUserQuery)
      );
    });

    it("should return 404 if user not found", async () => {
      (mockGetUserHandler.execute as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get("/users/999");

      expect(res.status).toBe(404);
    });

    it("should handle errors when fetching a user", async () => {
      (mockGetUserHandler.execute as jest.Mock).mockRejectedValue(new Error("fail"));

      const res = await request(app).get("/users/1");

      expect(res.status).toBe(500);
    });
  });

  // 📌 UPDATE
  describe("PUT /users", () => {
    it("should update a user", async () => {
      (mockUpdateUserHandler.execute as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).put("/users").send(mockUser);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(mockUser);
      expect(mockUpdateUserHandler.execute).toHaveBeenCalledWith(
        expect.any(UpdateUserCommand)
      );
    });

    it("should return 404 if user not found", async () => {
      (mockUpdateUserHandler.execute as jest.Mock).mockResolvedValue(null);

      const res = await request(app).put("/users").send(mockUser);

      expect(res.status).toBe(404);
    });

    it("should handle errors when updating a user", async () => {
      (mockUpdateUserHandler.execute as jest.Mock).mockRejectedValue(new Error("fail"));

      const res = await request(app).put("/users").send(mockUser);

      expect(res.status).toBe(500);
    });
  });

  // 📌 DELETE
  describe("DELETE /users/:id", () => {
    it("should delete a user", async () => {
      (mockDeleteUserHandler.execute as jest.Mock).mockResolvedValue(undefined);

      const res = await request(app).delete("/users/1");

      expect(res.status).toBe(204);
      expect(mockDeleteUserHandler.execute).toHaveBeenCalledWith(
        expect.any(DeleteUserCommand)
      );
    });

    it("should return 404 if user not found", async () => {
      (mockDeleteUserHandler.execute as jest.Mock).mockRejectedValue(new Error("User not found"));

      const res = await request(app).delete("/users/999");

      expect(res.status).toBe(404);
    });

    it("should handle errors when deleting a user", async () => {
      (mockDeleteUserHandler.execute as jest.Mock).mockRejectedValue(new Error("fail"));

      const res = await request(app).delete("/users/1");

      expect(res.status).toBe(500);
    });
  });
});
