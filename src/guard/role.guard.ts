
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants/decorator';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        console.log("role gurard")
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || !requiredRoles.length) {
            return true;
        }
        console.log("required roles",requiredRoles);
        const { user } = context.switchToHttp().getRequest();
        console.log(user)
        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Access denied for this service');
        }
        return true;
    }
}
