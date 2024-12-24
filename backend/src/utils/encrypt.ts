import bcryptUtils from "bcryptjs"

export const encryptPassword = async (password : string) => {
  return await bcryptUtils.hash(password,8)
}