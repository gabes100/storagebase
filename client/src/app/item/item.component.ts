import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Item } from '../item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  // server data
  public user: any;
  public items: Item[];
  public units: any[];

  //form groups
  public unitForm: FormGroup; 

  //global
  public currentItem;

  constructor(
    private router : Router,
    private api : ApiService) { }

  ngOnInit(): void {
    this.api.getItemsNoStorage().subscribe(items =>{
      this.items = items;

      if (this.items.length == 0) {
        this.router.navigate(['item-view']);
      }
    });

    this.api.getStorageUnits().subscribe(units => {
      this.units = units;
    });

    this.user = JSON.parse(localStorage.getItem('user-login'));

    // create forms
    this.unitForm = new FormGroup({
        unitName: new FormControl('')
    });    

  }

  createUnit() : void {
    if (this.unitForm.get('unitName')) {
      let credentials = {
        storageName : this.unitForm.get('unitName').value,
        userId: this.user.id
      };
      this.api.createUnit(credentials).subscribe(result => {
        alert("Unit Created");
       });
     
    } else {
      alert('Please Enter A Name');
    }
  }

  openAddModal(data : Item){
    this.currentItem = data;

  }

  addToUnit(data: any) : void {
    let cred = {
      storageId : data.id,
      itemId : this.currentItem.id
    }
    this.api.setStorageUnit(cred).subscribe(result => {
      alert("Item Storage Unit Updated");
      location.reload();
     });

     

  }

}
