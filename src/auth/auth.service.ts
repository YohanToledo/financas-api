import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/components/users/entities/users.entity';
import { UsersService } from 'src/components/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.fullName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.usersService.findOneOrFail({
        where: { email: email },
      });
    } catch (err) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }
}
