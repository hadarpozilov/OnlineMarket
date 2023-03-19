import cyber from "../2-utils/cyber";
import { ICredentialsModel } from "../4-models/credentials-model";
import { IUserModel, UserModel } from "../4-models/user-model";
import { ValidationError, UnauthorizedError } from "../4-models/error-models";

async function isUserIdFree(userId: number): Promise<boolean> {
  const result = await UserModel.find({ userId: userId }).exec();
  if (result.length !== 0) {
    return false;
  }
  return true;
}

async function register(user: IUserModel): Promise<string> {
  const errors = user.validateSync();
  if (errors) {
    throw new ValidationError(errors.message);
  }
  const isTaken = await isUserIdFree(user.userId);
  if (!isTaken) {
    throw new ValidationError(`Sorry. User Id ${user.userId} is not available.`);
  }
  user.password = cyber.hash(user.password);
  user.save();
  delete user.password;
  const token = cyber.getNewToken(user);
  return token;
}

//--------------------

async function login(credentials: ICredentialsModel): Promise<string> {
  const errors = credentials.validateSync();
  if (errors) {
    throw new ValidationError(errors.message);
  }
  credentials.password = cyber.hash(credentials.password);
  const users = await UserModel.find({email: credentials.email,password: credentials.password,}).exec();
  if (users.length === 0) {
    throw new UnauthorizedError("אחד מהשדות שגויים.");
  }
  const user = users[0];
  delete user.password;
  const token = cyber.getNewToken(user);
  return token;
}

export default {
  isUserIdFree,
  register,
  login,
};
