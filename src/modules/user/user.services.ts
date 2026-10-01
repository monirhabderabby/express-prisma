import bcrypt from "bcrypt";
import prisma from "../../config/prisma";
import { CreateUserInput } from "./user.interface";

export const createUserService = async (payload: CreateUserInput) => {
  const { name, email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new Error("User with this email already exists!");
  }

  // 2. Password secure hash kora
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return newUser;
};
