import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Item } from '../item';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders: any[]
 
  public itemList: Item[];
  public orderForm: FormGroup;
  public itemForm: FormGroup;

  constructor( 
    private api : ApiService) { }

  ngOnInit(): void {
    this.api.getOrders().subscribe(orders =>{
      this.orders = orders;
    });

    this.itemList = [];

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
  addItem(){
    const newItem = {
      name: this.itemForm.get("itemName").value,
      type: this.itemForm.get("type").value,
      price: this.itemForm.get("price").value,
      expiration: this.itemForm.get("expiration").value,
      quantity: this.itemForm.get("quantity").value
    }

    const itemElem = new Item(newItem);
    this.itemList.push(itemElem);

    //get totals:
    const totalItems = this.orderForm.get('totalItems').value
    this.orderForm.get('totalItems').setValue(Number(totalItems) + Number(newItem.quantity));

    const totalPrice = this.orderForm.get('totalPrice').value
    const price = Number(totalPrice) + (Number(newItem.price) * Number(newItem.quantity));
    this.orderForm.get('totalPrice').setValue(price);
    this.itemForm.reset();
  }

  clearAllItems(){
    this.itemList.forEach(element => {
      this.removeItem(this.itemList.indexOf(element));
    });

  }

  removeItem(index: number){
    this.itemList.splice(index, 1);
  }

}
