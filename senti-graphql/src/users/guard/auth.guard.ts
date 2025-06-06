import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    
    canActivate( context: ExecutionContext ): boolean {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
    
        const authHeader = request.headers.authorization;
        if(!authHeader) {
          throw new UnauthorizedException('No token provided');
        }
    
        const token = authHeader.split(' ')[1];
        try {
          const decoded = this.jwtService.verify(token);
          request.user = decoded;
          return true
        } 
        catch(error) {
          throw new UnauthorizedException('Unauthorized token');
        }
    }
}