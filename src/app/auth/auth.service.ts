import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModal: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModal.findOne({ email: email });

    if (
      user &&
      bcrypt.compareSync(password, user?.password) &&
      user.emailVerified === true
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user) {
    const payload = {
      userId: user._id,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatarUrl,
      sex: user.sex,
      birthDay: user.birthDay,
    };
    return {
      user: payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
