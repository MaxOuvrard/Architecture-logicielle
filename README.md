Bien sûr ! Voici une **version mise à jour de ton README** pour refléter la structure **CQRS** que nous avons mise en place :

---

# 📂 TP1 - Gestion Utilisateurs (CQRS)

Ce projet est une **API REST TypeScript** qui gère des utilisateurs avec un CRUD complet.
L’architecture est organisée en **couches (Domain, Application, Infrastructure, Presentation)** et utilise le **pattern CQRS** pour séparer les opérations de lecture et d’écriture.
La gestion automatique du profil d’un utilisateur est basée sur son email.

---

## 🏗️ Structure du projet

```
Architecture-logicielle/
│
├── domain/
│   ├── entities/
│   │   └── User.ts
│   ├── repositories/
│   │   ├── IUserCommandRepository.ts
│   │   └── IUserQueryRepository.ts
│   └── services/
│       └── IUserService.ts
│
├── application/
│   ├── commands/
│   │   ├── CreateUserCommand.ts
│   │   ├── UpdateUserCommand.ts
│   │   └── DeleteUserCommand.ts
│   ├── queries/
│   │   └── GetUserQuery.ts
│   ├── handlers/
│   │   ├── command-handlers/
│   │   │   ├── CreateUserHandler.ts
│   │   │   ├── UpdateUserHandler.ts
│   │   │   └── DeleteUserHandler.ts
│   │   └── query-handlers/
│   │       └── GetUserHandler.ts
│   └── dto/
│       └── UserDTO.ts
│
├── infrastructure/
│   ├── database/
│   │   └── orm.config.ts
│   ├── repositories/
│   │   ├── UserCommandRepository.ts
│   │   └── UserQueryRepository.ts
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
   * Récupérer un utilisateur par ID ou tous les utilisateurs
   * Mettre à jour un utilisateur
   * Supprimer un utilisateur

2. **Gestion automatique du profil**

   * Si l’email se termine par `@company.com` → profil `ADMIN`
   * Sinon → profil `STANDARD`

3. **Architecture CQRS**

   * **Commands** : opérations d’écriture (Create, Update, Delete)
   * **Queries** : opérations de lecture (Get by ID, Get all)
   * **Handlers** : contiennent la logique métier et orchestrent les repositories
   * **Repositories** : séparés pour lecture et écriture

---

## 📂 Contenu des fichiers

### Domaine

* `User.ts` → Classe représentant un utilisateur.
* `IUserCommandRepository.ts` → Interface pour les opérations d’écriture.
* `IUserQueryRepository.ts` → Interface pour les opérations de lecture.
* `IUserService.ts` → Interface pour la logique métier (profil automatique).

### Application

* `commands/` → Commandes CRUD (Create, Update, Delete).
* `queries/` → Requêtes de lecture (GetUser, GetAllUsers).
* `handlers/` → Handlers pour exécuter les commandes et requêtes.
* `dto/` → Structure des données envoyées par le client.

### Infrastructure

* `UserCommandRepository.ts` → Implémentation des opérations d’écriture.
* `UserQueryRepository.ts` → Implémentation des opérations de lecture.
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

| Méthode | URL          | Description                     | Body/Params                                 |
| ------- | ------------ | ------------------------------- | ------------------------------------------- |
| POST    | `/users`     | Créer un utilisateur            | `{ firstName, lastName, email, phone }`     |
| GET     | `/users/:id` | Récupérer un utilisateur        | `id` dans params                            |
| GET     | `/users`     | Récupérer tous les utilisateurs | Aucun                                       |
| PUT     | `/users`     | Mettre à jour un utilisateur    | `{ id, firstName, lastName, email, phone }` |
| DELETE  | `/users/:id` | Supprimer un utilisateur        | `id` dans params                            |

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

* Projet modulaire et testable grâce à l’architecture en couches et au pattern CQRS.
* `UserRepository` en mémoire pour développement rapide ; peut être remplacé par un ORM comme TypeORM ou Prisma.
* Tests unitaires possibles dans `tests/userController.test.ts`.

