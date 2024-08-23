import { Component } from '@angular/core';
import { RoutesEnum } from './../../commons/enums/routes.enum';
import { RouteService } from '../../services/route.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public routeService: RouteService) { }
}
