import jwt from 'jsonwebtoken';
import "dotenv/config";
import userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

function generateJWT(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

async function loginService(email, password) {
  const user = await userRepository.findUserByEmailRepository(email);

  if (!user) throw new Error('Invalid username or password');

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) throw new Error('Invalid username or password');

  return generateJWT(user.id);
}

export { generateJWT, loginService };