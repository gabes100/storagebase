import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  //form groups
  public unitForm: FormGroup; 

  constructor(
    private api : ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user-login'));

    this.api.getItemsNoStorage().subscribe(items =>{
      this.items = items;
    });

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
      this.api.createUnit(credentials).subscribe();
      alert("Unit Created");
    } else {
      alert('Please Enter A Name');
    }
  }

}
