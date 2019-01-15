import jwt from "jsonwebtoken";

const decodeJWT = (token: string): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    try {
      const decodedToken: any = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || ""
      );
      const { userId } = decodedToken;
      if (userId) {
        resolve(userId);
      } else {
        resolve(undefined);
      }
    } catch (err) {
      resolve(undefined);
    }
  });
};

export default decodeJWT;
