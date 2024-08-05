import prisma from '../prisma/client.js';

class AddressRepository {
  async create(addressData) {
    return prisma.address.create({ data: addressData });
  }
}

export default AddressRepository;