import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Obtener el token del header Authorization
    const authHeader : string = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No se envió el token');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    try {
      // Verificar la firma del token
      const payload = await this.jwtService.verifyAsync<any>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Validar que el token siga activo en Redis
      await this.authService.validateToken(payload.sub, token);

      // Guardar usuario en la request para usarlo en el controlador
      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Token inválido o expirado');
    }
  }
}
