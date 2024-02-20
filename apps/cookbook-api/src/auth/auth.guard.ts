import { UserRequest, UserRole } from '@cookbook/models';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // get the user from the request
    const user = request.user as UserRequest;
    if (!user) {
      throw new UnauthorizedException();
    }

    // Get the role from the decorator @Auth(UserRole)
    const role =
      this.reflector.get<UserRole>('authRole', context.getHandler()) ||
      UserRole.Admin;

    if (user.role === role) {
      return true;
    }

    // If the user is not authorized, return false
    return false;
  }
}
