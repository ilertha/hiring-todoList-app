import bcryptUtils from "bcryptjs";

export const encryptPassword = async (password) => {
  return await bcryptUtils.hash(password, 8);
};
