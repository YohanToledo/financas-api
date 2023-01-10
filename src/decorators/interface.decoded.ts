import { Timestamp } from 'typeorm';

export interface IJwt {
  sub: string;
  email: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  iat: number;
  exp: number;
}

export interface IDecodedToken {
  sub: number;
  email: string;
  name: string;
}
