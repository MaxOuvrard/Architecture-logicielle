TP1 - Gestion des utilisateurs (Architecture en couches)

But:
- Implémenter un service CRUD pour les utilisateurs (Créer, Lire, Mettre à jour, Supprimer).
- Stocker les informations: nom (lastName), prénom (firstName), email, téléphone.
- Assigner un profil automatiquement basé sur une règle métier.

Règle métier implémentée:
- Si l'email appartient au domaine `company.com` => profil `Administrateur`.
- Sinon => profil `Utilisateur Standard`.

Architecture (3 couches simplifiée):
- routes/ : exposition HTTP
- controllers/ : gestion des requêtes/erreurs
- services/ : règles métier (assignProfile)
- repositories/ : accès au stockage (fichier JSON simple)

Exemples d'API (server écoute sur le port 3000 par défaut):

- POST /users
  Body: { "firstName":"Jean", "lastName":"Dupont", "email":"jean@company.com", "phone":"0123456789" }
  Réponse: l'utilisateur créé avec `profile` attribué automatiquement.

- GET /users
  Récupère tous les utilisateurs

- GET /users/:id
  Récupère un utilisateur

- PUT /users/:id
  Met à jour un utilisateur (si email changé, le profile est recalculé)

- DELETE /users/:id
  Supprime un utilisateur

Lancement:

```powershell
npm install
npm start
```

Notes:
- Stockage simple dans `data/users.json` pour ce TP. Pas de base de données externe.
- Améliorations possibles: validation plus complète, tests unitaires, pagination, recherche.
