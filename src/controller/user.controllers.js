import userService from "../service/user.services.js";
import { loginService } from "../service/auth.service.js";

async function createUserController(req, res) {
    const newUser = req.body;

    try {
        const token = await userService.createUserService(newUser);
        res.status(201).send({ token })
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function loginController(req, res) {
    const { email, password } = req.body;

    try {
        const token = await loginService(email, password);
        res.status(200).send({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function findAllUsersController(req, res) {

    try {
        const user = await userService.findAllUsersService();
        res.status(200).send({ user });
    } catch (err) {
        res.status(404).send(err.message);
    }
}

async function findByIdController(req, res) {
    const { id } = req.params;

    try {
        const user = await userService.findUserByIdService(id);
        return res.status(200).send({ user });
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

async function updateUserController(req, res) {
    const { id } = req.params;
    const newUser = req.body;
    
    try {
        const user = await userService.updateUserService(newUser, id);
        res.status(200).send({ user });
    } catch (error) {
        res.status(404).send(error.message);
    }
}

async function deleteUserController(req, res) {
    const { id } = req.params;

    try {
        const user = await userService.deleteUserService(id);
        res.status(200).send({ user });
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export default {
    createUserController,
    findAllUsersController,
    findByIdController,
    updateUserController,
    deleteUserController,
    loginController
}