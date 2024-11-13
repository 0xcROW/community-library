import userRepository from "../repositories/user.repository.js";
import bcrypt from 'bcrypt';
import { generateJWT } from "./auth.service.js";

async function createUserService(newUser) {
    const foundUser = await userRepository.findUserByEmailRepository(newUser.email)
    if(foundUser) throw new Error("User already exists!");
    const passHash = await bcrypt.hash(newUser.password, 10);
    const user = await userRepository.createUserRepository({...newUser, password: passHash});
    if(!user) throw new Error("Error creating the user!");
    const token = generateJWT(user.id);
    return token;
}

async function findAllUsersService() {
    const users = await userRepository.findAllUsersRepository();
    return users;
  }

async function findUserByIdService(id) {
    const user = await userRepository.findUserByIdRepository(id);
    if (!user) throw new Error("User not found");
    return user;
  }

async function updateUserService(newUser, newId) {
    const user = await userRepository.findUserByIdRepository(newId);
    if(!user) throw new Error("User not found!");
    if(newUser.password){
        newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    const updatedUser = await userRepository.updateUserRepository(newId, newUser);
    if(!updatedUser) throw new Error("Error updating the user!");
    return updatedUser;
}

async function deleteUserService(id){
    const user = await userRepository.findUserByIdRepository(id);
    if(!user) throw new Error("User not found!");
    await userRepository.deleteUserRepository(id);
    return {message: "User deleted"};
}

export default {
    createUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
    deleteUserService
}