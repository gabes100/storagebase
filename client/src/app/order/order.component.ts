import { Component, OnInit } from '@angular/core';
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
    const today = new Date().toJSON().slice(0, 10);
    const name = this.orderForm.get('orderName').value;

    if (this.itemList && name) {
       
        let credentials_order = {
         name : name, 
         enterDate: today.toString(),
        };
       
       this.api.createOrder(credentials_order).subscribe(newOrder => {
        this.itemList.forEach(item => {
   
        let credentials_item = {
          name : item.name, 
          expiration: item.expiration.toString(), 
          price: item.price,
          itemType: item.type, 
          orderId: newOrder.id};

          console.log(credentials_item);
       
          for (var index = 0; index < item.quantity; index++) {
              this.api.enterItem(credentials_item).subscribe();  
            }
          });
       });
    } else {
      alert("Please enter order name and add items");
    }

    //window.location.reload(); //reload data
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
    const price =  (Math.round(Number(totalPrice) + (Number(newItem.price) * Number(newItem.quantity)) * 100) / 100).toFixed(2);
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
