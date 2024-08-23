import { Component } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(public routeService: RouteService) { }
}
