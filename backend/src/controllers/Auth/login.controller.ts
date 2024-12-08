import { userService } from "../../services";
import { Request, Response } from "express";
import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";

const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = await userService.getOneUser({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Password is incorrect!" });
    }

    const token = generateToken(user.uuid);
    return res.status(200).json({ token, uuid: user.uuid });
  } catch (err) {
    return res.status(500).json({ error: "Could not sign in" });
  }
};

export const loginController = errorHandlerWrapper(loginHandler);