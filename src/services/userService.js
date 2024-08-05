import bcrypt from 'bcrypt';

class UserService {
  constructor(userRepository, addressRepository) {
    this.userRepository = userRepository;
    this.addressRepository = addressRepository;
  }

  async createUser(userData, addressData) {
    const { email, cpfCnpj, phoneNumber, password, birthDate } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Este email já está em uso');
    }

    const existingCpfCnpj = await this.userRepository.findByCpfCnpj(cpfCnpj);
    if (existingCpfCnpj) {
      throw new Error('Este CPF/CNPJ já está em uso');
    }

    const existingPhoneNumber = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (existingPhoneNumber) {
      throw new Error('Este número de telefone já está em uso');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const parsedBirthDate = new Date(birthDate);

    const user = await this.userRepository.create({ ...userData, password: hashPassword, birthDate: parsedBirthDate });

    await this.addressRepository.create({ ...addressData, userId: user.id });

    return user;
  }
}

export default UserService;
