import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  id: number;
  username: string;
  email: string;
  @Exclude()
  password: string;
}
