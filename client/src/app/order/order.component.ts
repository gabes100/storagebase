import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[]
  public orderForm: FormGroup;
  public itemForm: FormGroup;


  constructor( 
    private api : ApiService) { }

  ngOnInit(): void {
    this.api.getOrders().subscribe(orders =>{
      this.orders = orders;
    });

    this.orderForm = new FormGroup({
      orderName: new FormControl(''),
      totalItems: new FormControl(''),
      totalPrice: new FormControl(''),
    });
    this.itemForm = new FormGroup({
      itemName: new FormControl(''),
      type: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl(''),
      expiration: new FormControl(''),
    });
  }

  createOrder(){
    
  }

}
