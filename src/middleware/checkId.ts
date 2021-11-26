import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

const checkId = async (req: Request, res: Response, next: NextFunction) => {
  const isIdValid = Types.ObjectId.isValid(
    req.params.userId || req.params.postId,
  );

  if (!isIdValid) {
    res.json('Invalid id');
  } else {
    next();
  }
};

export default checkId;
