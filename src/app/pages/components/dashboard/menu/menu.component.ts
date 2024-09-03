import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule],
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

  constructor() {
    this.calculateTotal(); // Initial calculation
  }

  value: any = '8';
  quantity: number = 1;
  unitPrice: number = 100; // Set your product price here
  totalPrice: number = 0;
  priceWithoutTax: any;
  increment() {
    this.quantity++;
    this.calculateTotal();
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    const taxRate = 0.12; // 12% tax
    this.priceWithoutTax = this.quantity * this.unitPrice;
    this.totalPrice = this.priceWithoutTax + (this.priceWithoutTax * taxRate);
  }
}
