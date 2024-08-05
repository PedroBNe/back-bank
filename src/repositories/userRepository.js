import prisma from '../prisma/client.js';

class UserRepository {
  async create(userData) {
    return prisma.user.create({ data: userData });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findByCpfCnpj(cpfCnpj) {
    return prisma.user.findUnique({ where: { cpfCnpj } });
  }

  async findByPhoneNumber(phoneNumber){
    return prisma.user.findUnique({ where: { phoneNumber } });
  }
}

export default UserRepository;