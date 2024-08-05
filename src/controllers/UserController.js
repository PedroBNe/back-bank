import AddressRepository from "../repositories/AddressRepository.js";
import UserRepository from "../repositories/userRepository.js";
import UserService from "../services/userService.js";

const userService = new UserService(new UserRepository(), new AddressRepository());

export const signup = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, cpfCnpj, birthDate, balance, cep, street, city, state, country } = req.body;

    const userData = { name, email, password, phoneNumber, cpfCnpj, birthDate, balance };
    const addressData = { cep, street, city, state, country };

    const userDb = await userService.createUser(userData, addressData);

    res.status(201).json(userDb);
  } catch (err) {
    if (err.message === 'Este email já está em uso' || err.message === 'Este CPF/CNPJ já está em uso' || err.message === 'Este número de telefone já está em uso') {
      res.status(400).json({ message: err.message });
    } else {
      console.error(err);
      res.status(500).json({ message: "Erro no Servidor, tente novamente" });
    }
  }
};