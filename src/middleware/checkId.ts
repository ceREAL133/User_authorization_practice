import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import User from '../model/user.model';
// import { findUser } from '../service/user.service';

const checkId = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const isIdValid = Types.ObjectId.isValid(userId);

  if (!isIdValid) {
    res.sendStatus(404);
  } else {
    try {
      const user = await User.findById(userId);

      if (!user) {
        res.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
  next();
};

export default checkId;
