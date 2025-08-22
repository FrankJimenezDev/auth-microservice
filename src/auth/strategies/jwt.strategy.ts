import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Redis from 'ioredis';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        @Inject('REDIS_CLIENT')
        private readonly redis: Redis,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
            // para obetener el jwt del header Authorization
            passReqToCallback: true,
        });

    }

    async validate(req: Request, payload: { username: string, sub: string }) {
        const { username, sub } = payload;
        // Tomar el token directamente del header
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        // Buscar token en Redis
        const storedToken = await this.redis.get(`user:${sub}`);
        if (!storedToken) {
            throw new UnauthorizedException('Sesión expirada o cerrada');
        }

        if (storedToken !== token) {
            throw new UnauthorizedException(
                'Tu sesión fue cerrada porque iniciaste sesión en otro dispositivo',
            );
        }
        // Retornás lo que quieras que se guarde en req.user
        return { sub, username };
    }
}
