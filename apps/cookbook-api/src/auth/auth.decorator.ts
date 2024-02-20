import { UserRole } from '@cookbook/models';
import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const Auth = (role: UserRole): CustomDecorator<string> => {
  return SetMetadata('authRole', role);
};
