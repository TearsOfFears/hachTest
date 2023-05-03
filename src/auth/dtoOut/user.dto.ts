import { ITokens } from '../dto/tokens.dto';
import { User } from '../entities/user.entity';

export interface RegisterUserDto extends ITokens, User {}
