import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Item } from '../item';
import { Order } from '../order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders: Order[]
 
  public itemList: Item[];
  public orderForm: FormGroup;
  public itemForm: FormGroup;
  public user: any;
  public isEdit: boolean;
  
  constructor( 
    private api : ApiService) { }

  ngOnInit(): void {
    this.api.getOrders().subscribe(orders =>{
      this.orders = orders;
    });

    this.itemList = [];
    this.user = JSON.parse(localStorage.getItem('user-login'));

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

  openModal(isEdit: boolean, orderIndex: number) {
    this.isEdit = isEdit;

    // reset on load
    this.itemList = [];
    this.orderForm.reset();
    this.itemForm.reset();

    // get order items
    if (!this.isEdit) {
      const orderID = {orderID: this.orders[orderIndex].id};

      this.api.getItemsByOrderName(orderID).subscribe(items =>{
        this.itemList = items;
      });
    }

    this.orderForm.get('orderName').patchValue(this.orders[orderIndex].name);
    this.orderForm.get('totalItems').patchValue(this.orders[orderIndex].totalItems);
    this.orderForm.get('totalPrice').patchValue(this.orders[orderIndex].totalPrice);
  }

  createOrder(){
    const today = new Date().toJSON().slice(0, 10);
    const name = this.orderForm.get('orderName').value;

    if (this.itemList && name) {
        let credentials_order = {
         name : name, 
         enterDate: today.toString(),
         totalItems: this.orderForm.get('totalItems').value,
         totalPrice: this.orderForm.get('totalPrice').value,
         userId: this.user.id,
        };
       
       this.api.createOrder(credentials_order).subscribe(newOrder => {
          this.itemList.forEach(item => {
   
          let credentials_item = {
            name : item.name, 
            expiration: item.expiration.toString(), 
            price: Number(item.price),
            quantity: item.quantity,
            itemType: item.type, 
            orderId: newOrder.id,
          };
          this.api.enterItem(credentials_item).subscribe();
        });
       });
       document.getElementById('orderCreate').style.display = "none"; //close modal
       location.reload();
    } else {
      alert("Please enter order name and/or add items");
    }
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
    const totalItems = this.orderForm.get('totalItems').value;
    this.orderForm.get('totalItems').setValue(Number(totalItems) + Number(newItem.quantity));

    const totalPrice = this.orderForm.get('totalPrice').value;
    const price = (Number(totalPrice) + (Number(newItem.price) * Number(newItem.quantity))).toFixed(2);
    this.orderForm.get('totalPrice').setValue(price);

    //reset form
    this.itemForm.reset();
  }

  clearAllItems(){
    this.itemList = [];

    this.orderForm.get("totalPrice").setValue('0.00');
    this.orderForm.get("totalItems").setValue('0');
  }

  removeItem(index: number){
    const totalItems = this.orderForm.get('totalItems').value;
    const totalPrice = this.orderForm.get('totalPrice').value;
  
    const price = (Math.round(Number(totalPrice) - Number(this.itemList[index].price) * Number(this.itemList[index].quantity) * 100) / 100).toFixed(2);
    this.orderForm.get("totalPrice").setValue(price);
    this.orderForm.get("totalItems").setValue(Number(totalItems) - Number(this.itemList[index].quantity));

    this.itemList.splice(index, 1);
  }

}
