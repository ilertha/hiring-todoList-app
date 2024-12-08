import { UserEntity } from "../entities";
import { AppDataSouce } from "../db";

export const createUser = async (data) => {
  const { username, email, password } = data;
  const userRepository = AppDataSouce.getRepository(UserEntity);
  const existingUser = await userRepository.findOne({
    where: { email },
  });
  if (existingUser) return null;
  const user = userRepository.create({ username, email, password });
  await userRepository.save(user);
  return user;
};

export const getOneUser = async (data) => {
  const userRepository = AppDataSouce.getRepository(UserEntity);
  const findUser = await userRepository.findOne({ where: { ...data } });
  if (!findUser) return null;
  return findUser;
};
