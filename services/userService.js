const repo = require('../repositories/userRepository');

function assignProfile(user) {
  // Règle métier: si le domaine de l'email est `company.com` => Administrateur
  // sinon => Utilisateur Standard
  if (!user || !user.email) return 'Utilisateur Standard';
  const email = user.email.toLowerCase();
  if (email.endsWith('@company.com')) return 'Administrateur';
  return 'Utilisateur Standard';
}

module.exports = {
  list: async () => await repo.findAll(),
  get: async (id) => await repo.findById(id),
  create: async (payload) => {
    const user = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone || null,
    };
    user.profile = assignProfile(user);
    return await repo.create(user);
  },
  update: async (id, payload) => {
    const patch = {};
    if (payload.firstName !== undefined) patch.firstName = payload.firstName;
    if (payload.lastName !== undefined) patch.lastName = payload.lastName;
    if (payload.email !== undefined) patch.email = payload.email;
    if (payload.phone !== undefined) patch.phone = payload.phone;

    // If email present in patch, recalc profile
    if (patch.email) {
      patch.profile = assignProfile(patch);
    }
    return await repo.update(id, patch);
  },
  remove: async (id) => await repo.remove(id),
};
