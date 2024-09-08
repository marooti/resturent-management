import { Injectable } from '@angular/core';
import { RoutesEnum } from '../commons/enums/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() { }

  get dashboard() {
    return RoutesEnum.DASHBOARD;
  }



}
