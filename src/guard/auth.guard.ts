
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { jwt_secret } from '../constants/constants';
import { IS_PUBLIC_KEY } from '../constants/decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) { }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        // ------- excluding public endpoint ----------
        const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        // ------- checking  authrorizaiton -------
        const request: Request = context.switchToHttp().getRequest();
        const token: string = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token, {
                secret: jwt_secret
            });
            request.user = payload;
        } catch (e) {
            console.log("ee",e)
            let msg;
            if (e.message == 'jwt expired') msg = 'Token Expired'
            throw new UnauthorizedException(msg);
        }
        return true;
    }


}
