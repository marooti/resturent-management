import { Injectable } from '@angular/core';
import { RoutesEnum } from '../commons/enums/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() { }

  get login() {
    return RoutesEnum.LOGIN;
  }

  get signup() {
    return RoutesEnum.SIGNUP;
  }

  get forgotPassword() {
    return RoutesEnum.FORGOT_PASSWORD;
  }

  get dashboard() {
    return RoutesEnum.DASHBOARD;
  }
get checkingdetail(){
  return RoutesEnum.CHECKING_DETAIL;
}

  get security() {
    return RoutesEnum.SECURITY;
  }

  get settings() {
    return RoutesEnum.SETTINGS;
  }
}
