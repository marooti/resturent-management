import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  listOfMenu: any[] = [
    {
      image: 'https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg',
      foodName: "Cheese Burger",
      price: "300"
    },
    {
      image: 'https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg',
      foodName: "Chicken Burger",
      price: "370"
    },
    {
      image: 'https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg',
      foodName: "Turkish Burger",
      price: "570"
    },
    {
      image: 'https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg',
      foodName: "Turkish Burger",
      price: "570"
    },
    {
      image: 'https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg',
      foodName: "Turkish Burger",
      price: "570"
    },
    {
      image: 'https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg',
      foodName: "Turkish Burger",
      price: "570"
    },

  ]
}
