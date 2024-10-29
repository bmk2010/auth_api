import jwt from "jsonwebtoken";

const SECRET_KEY = "e-commerce";

function generateToken(name: string) {
  return jwt.sign({ name }, SECRET_KEY, { expiresIn: "1h" });
}

interface User {
  name: string;
  password: string;
  fullInfo: object;
  token: string;
}

interface UserData {
  users: User[];
  admins: User;
}

const checkToken = (adminToken: string, data: UserData) => {
  if (data.admins.token !== adminToken) {
    return false
  }
  return true
};

export default generateToken;
export { checkToken };
