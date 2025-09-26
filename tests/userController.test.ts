import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { UserController } from "../presentation/controllers/UserController";
import { CreateUserUseCase } from "../application/useCase/CreateUserUseCase";
import { GetUserUseCase } from "../application/useCase/GetUserUseCase";
import { UpdateUserUseCase } from "../application/useCase/UpdateUserCase";
import { DeleteUserUseCase } from "../application/useCase/DeleteUserUseCase";

// 🟢 Création des mocks
const mockCreateUser = { execute: jest.fn() } as unknown as CreateUserUseCase;
const mockGetUser = { execute: jest.fn() } as unknown as GetUserUseCase;
const mockUpdateUser = { execute: jest.fn() } as unknown as UpdateUserUseCase;
const mockDeleteUser = { execute: jest.fn() } as unknown as DeleteUserUseCase;

// 🟢 Injection des mocks dans le contrôleur
const userController = new UserController(
  mockCreateUser,
  mockGetUser,
  mockUpdateUser,
  mockDeleteUser
);

// 🟢 Configuration Express
const app = express();
app.use(bodyParser.json());
app.post("/users", userController.create);
app.get("/users/:id", userController.get);
app.put("/users", userController.update);
app.delete("/users/:id", userController.delete);

// 🟢 Données mock
const mockUser = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "123456789",
  profile: "STANDARD",
};

describe("UserController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 📌 CREATE
  describe("POST /users", () => {
    it("should create a user", async () => {
      (mockCreateUser.execute as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).post("/users").send(mockUser);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(mockUser);
      expect(mockCreateUser.execute).toHaveBeenCalledWith(mockUser);
    });

    it("should handle errors when creating a user", async () => {
      (mockCreateUser.execute as jest.Mock).mockRejectedValue(new Error("fail"));

      const res = await request(app).post("/users").send(mockUser);

      expect(res.status).toBe(500);
    });
  });

  // 📌 READ
  describe("GET /users/:id", () => {
    it("should return a user if found", async () => {
      (mockGetUser.execute as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).get("/users/1");

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(mockUser);
      expect(mockGetUser.execute).toHaveBeenCalledWith("1");
    });

    it("should return 404 if user not found", async () => {
      (mockGetUser.execute as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get("/users/999");

      expect(res.status).toBe(404);
    });

    it("should handle errors when fetching a user", async () => {
      (mockGetUser.execute as jest.Mock).mockRejectedValue(new Error("fail"));

      const res = await request(app).get("/users/1");

      expect(res.status).toBe(500);
    });
  });

  // 📌 UPDATE
  describe("PUT /users", () => {
    it("should update a user", async () => {
      (mockUpdateUser.execute as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).put("/users").send(mockUser);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(mockUser);
      expect(mockUpdateUser.execute).toHaveBeenCalledWith(mockUser);
    });

    it("should return 404 if user not found", async () => {
      (mockUpdateUser.execute as jest.Mock).mockResolvedValue(null);

      const res = await request(app).put("/users").send(mockUser);

      expect(res.status).toBe(404);
    });

    it("should handle errors when updating a user", async () => {
      (mockUpdateUser.execute as jest.Mock).mockRejectedValue(new Error("fail"));

      const res = await request(app).put("/users").send(mockUser);

      expect(res.status).toBe(500);
    });
  });

  // 📌 DELETE
  describe("DELETE /users/:id", () => {
    it("should delete a user", async () => {
      (mockDeleteUser.execute as jest.Mock).mockResolvedValue(undefined);

      const res = await request(app).delete("/users/1");

      expect(res.status).toBe(204);
      expect(mockDeleteUser.execute).toHaveBeenCalledWith("1");
    });

    it("should return 404 if user not found", async () => {
      (mockDeleteUser.execute as jest.Mock).mockResolvedValue(null);

      const res = await request(app).delete("/users/999");

      expect(res.status).toBe(404);
    });

    it("should handle errors when deleting a user", async () => {
      (mockDeleteUser.execute as jest.Mock).mockRejectedValue(new Error("fail"));

      const res = await request(app).delete("/users/1");

      expect(res.status).toBe(500);
    });
  });
});
