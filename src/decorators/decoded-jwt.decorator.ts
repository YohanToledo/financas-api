import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IDecodedToken, IJwt } from './interface.decoded';

export const DecodedToken = createParamDecorator(
  (_, ctx: ExecutionContext): IDecodedToken => {
    const req = ctx.switchToHttp().getRequest();

    const [__, token] = req.headers.authorization.split(' ');

    const decoded = jwt.decode(token) as IJwt;

    return {
      sub: Number(decoded.sub),
      email: decoded.email,
      name: decoded.name,
    };
  },
);
