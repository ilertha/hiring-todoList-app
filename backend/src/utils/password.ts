import bcryptUtils from "bcryptjs";

export const comparePassword = async (inputPassword, hashPassword) => {
  return await bcryptUtils.compare(inputPassword, hashPassword);
};
