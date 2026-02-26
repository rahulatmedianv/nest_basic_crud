import { Request } from 'express';

export const validateRequest = (req: Request): boolean => {
  const { authorization } = req.headers;
  console.log({ authorization });
  const token = authorization?.split(' ')[1];
  console.log({ token });
  return token === 'thisissimpletoken';
};
