import userRepository from "../repositories/user.repository.js";
import bcrypt from 'bcrypt';

async function createUserService(newUser) {
    const foundUser = await userRepository.findUserByEmailRepository(newUser.email)
    if(foundUser) throw new Error("User already exists!")
    const passHash = await bcrypt.hash(newUser.password, 10)
    const user = await userRepository.createUserRepository({...newUser, password: passHash});
    if(!user) throw new Error("Error creating the user!")
    return user;
}

async function findAllUsersService(){
    return await userRepository.findAllUsersRepository();
}

async function findUserByIdService(id){
    const user = await userRepository.findUserByIdRepository(id);
    if(!user) throw new Error("User not found!");
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

export default {
    createUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService
}