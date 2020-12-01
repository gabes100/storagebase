import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Item } from '../item';
import { Order } from '../order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  // server data
  public user: any;
  public orders: Order[]

  // reactive forms
  public orderForm: FormGroup; 
  public itemForm: FormGroup;
 
  // global vars
  public isEdit: boolean;
  public itemList: Item[];

  constructor( 
    private api : ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.api.getOrders().subscribe(orders =>{
      this.orders = orders;
    });

    this.itemList = [];
    this.user = JSON.parse(localStorage.getItem('user-login'));

    // create forms
    this.orderForm = this.fb.group(
      {
        orderName: [{ value: ''}, Validators.required],
        totalItems: [{ value:'', disabled: true}],
        totalPrice: [{ value:'', disabled: true}],
      }
    );

    this.itemForm = this.fb.group(
      {
        itemName: [{ value: ''}, Validators.required],
        type: [{ value: ''}, Validators.required],
        quantity: [{ value: ''}, Validators.required],
        price: [{ value: ''}, Validators.required],
        expiration: [{ value: ''}, Validators.required],
      }
    );
  }
  

  openModal(isEdit: boolean, orderIndex: number) {
    this.isEdit = isEdit;
   
    // reset on load
    this.itemList = [];
    this.orderForm.reset();
    this.itemForm.reset();
    this.orderForm.get('orderName').enable();

    // get order items
    if (!this.isEdit) {
      const orderID = {orderID: this.orders[orderIndex].id};

      this.api.getItemsByOrderName(orderID).subscribe(items =>{
        this.itemList = items;
      });

      this.orderForm.get('orderName').patchValue(this.orders[orderIndex].name);
      this.orderForm.get('orderName').disable();
      this.orderForm.get('totalItems').patchValue(this.orders[orderIndex].totalItems);
      this.orderForm.get('totalPrice').patchValue(this.orders[orderIndex].totalPrice);
    }
  }

  createOrder(){
    const today = new Date().toJSON().slice(0, 10);
    const name = this.orderForm.get('orderName').value;

    if (this.itemList.length > 0 && name) {
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
    if (!this.itemForm.valid){
      alert("Some item attributes are not filled in :(");
    } else {
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
      document.getElementById('createItem').style.display = "none"; //close modal
    }
  }

  clearAllItems(){
    this.itemList = [];

    this.orderForm.get('orderName').setValue('');
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
