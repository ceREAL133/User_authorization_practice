import { Request, Response } from 'express';
import { omit, get } from 'lodash';
import {
  createUser,
  findUser,
  findFewUsers,
  deleteUser,
} from '../service/user.service';
import log from '../logger';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getAllUsersHandler(req: Request, res: Response) {
  const users = await findFewUsers();

  console.log(users);

  return res.send(users);
}

export async function getUserByIdHandler(req: Request, res: Response) {
  const userId = get(req, 'params.userId');
  const user = await findUser({ _id: userId });

  if (!user) {
    return res.status(404);
  }

  return res.send(user);
}

export async function deleteUserHandler(req: Request, res: Response) {
  const userId = get(req, 'params.userId');
  const user = await findUser({ _id: userId });

  if (!user) {
    return res.sendStatus(404);
  }

  await deleteUser({ _id: userId });

  return res.sendStatus(200);
}
