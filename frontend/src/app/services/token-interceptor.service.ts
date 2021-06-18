import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: any, next: any) {
    // Se encarga de obtener el token para enviarlo a las rutas que lo necesiten, en escencia es un middleware que revisa el que exista un token.
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.auth.getToken(),
      },
    });
    return next.handle(tokenReq);
  }
}
