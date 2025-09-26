# 📂 TP1 - Gestion Utilisateurs

Ce projet est une **API REST TypeScript** qui gère des utilisateurs avec un CRUD complet. L’architecture est organisée en **couches (Domain, Application, Infrastructure, Presentation)** et inclut la **gestion automatique du profil** d’un utilisateur en fonction de son email.

---

## 🏗️ Structure du projet

```
Architecture-logicielle/
│
├── domain/
│   ├── entities/
│   │   └── User.ts
│   ├── repositories/
│   │   └── IUserRepository.ts
│   └── services/
│       └── IUserService.ts
│
├── application/
│   ├── dto/
│   │   └── UserDTO.ts
│   └── use-cases/
│       ├── CreateUserUseCase.ts
│       ├── GetUserUseCase.ts
│       ├── UpdateUserUseCase.ts
│       └── DeleteUserUseCase.ts
│
├── infrastructure/
│   ├── database/
│   │   └── orm.config.ts
│   └── repositories/
│       └── UserRepository.ts
│   └── services/
│       └── UserService.ts
│
├── presentation/
│   ├── controllers/
│   │   └── UserController.ts
│   └── routes/
│       └── userRoutes.ts
│
└── tests/
    └── userController.test.ts
```

---

## ⚡ Fonctionnalités

1. **CRUD Utilisateur**

   * Créer un utilisateur
   * Récupérer un utilisateur par ID
   * Mettre à jour un utilisateur
   * Supprimer un utilisateur

2. **Gestion automatique du profil**

   * Si l’email se termine par `@company.com` → profil `ADMIN`
   * Sinon → profil `STANDARD`

3. **Architecture en couches**

   * **Domain** : Entités, interfaces et règles métier.
   * **Application** : Cas d’utilisation et DTO.
   * **Infrastructure** : Stockage, implémentations concrètes et services.
   * **Presentation** : Contrôleurs et routes HTTP (Express).

---

## 📂 Contenu des fichiers

### Domaine

* `User.ts` → Classe représentant un utilisateur.
* `IUserRepository.ts` → Interface pour le repository utilisateur.
* `IUserService.ts` → Interface pour la logique métier (profil automatique).

### Application

* `UserDTO.ts` → Structure des données envoyées par le client.
* `CreateUserUseCase.ts`, `GetUserUseCase.ts`, `UpdateUserUseCase.ts`, `DeleteUserUseCase.ts` → Cas d’utilisation CRUD.

### Infrastructure

* `UserRepository.ts` → Implémentation en mémoire (remplaçable par ORM/DB).
* `UserService.ts` → Logique métier pour assignation automatique des profils.

### Présentation

* `UserController.ts` → Gestion des requêtes HTTP.
* `userRoutes.ts` → Routes Express pour l’API utilisateur.

---

## 🚀 Installation et démarrage

1. Cloner le projet :

```bash
git clone <repo-url>
cd <project-folder>
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer le serveur :

```bash
npm run dev
```

4. L’API est disponible sur :

```
http://localhost:3000/users
```

---

## 🧪 Endpoints API

| Méthode | URL          | Description                  | Body/Params                                          |
| ------- | ------------ | ---------------------------- | ---------------------------------------------------- |
| POST    | `/users`     | Créer un utilisateur         | `{ firstName, lastName, email, phone }`              |
| GET     | `/users/:id` | Récupérer un utilisateur     | `id` dans params                                     |
| PUT     | `/users`     | Mettre à jour un utilisateur | `{ id, firstName, lastName, email, phone, profile }` |
| DELETE  | `/users/:id` | Supprimer un utilisateur     | `id` dans params                                     |

---

## ✅ Exemple d’utilisateur

```json
{
  "id": "uuid-generated",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@company.com",
  "phone": "0123456789",
  "profile": "ADMIN"
}
```

---

## 🧩 Notes

* Projet modulaire et testable grâce à l’architecture en couches.
* `UserRepository` en mémoire pour développement rapide ; peut être remplacé par un ORM comme TypeORM ou Prisma.
* Tests unitaires possibles dans `tests/userController.test.ts`.
