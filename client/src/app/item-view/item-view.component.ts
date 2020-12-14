import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Item } from '../item';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})

export class ItemViewComponent implements OnInit {
  public units: any;
  public user: any;
  public unitForm: FormGroup; 
  public storageUnit: any;
  public items: Item[];
  public searchForm: FormGroup;
  public expireView;

  constructor(
    private router : Router,
    private api : ApiService) { }

  ngOnInit(): void {
    this.updateView();

    this.storageUnit = JSON.parse(localStorage.getItem('selected-unit'));

    if (this.storageUnit) {
      this.updateViewItems();
      
    }
    

    this.expireView =false;

    this.searchForm = new FormGroup({
      searchInput: new FormControl('')
    });


    // create forms
    this.unitForm = new FormGroup({
      unitName: new FormControl('')
  });    

    this.user = JSON.parse(localStorage.getItem('user-login'));
  }

  createUnit() : void {
    if (this.unitForm.get('unitName')) {
      let credentials = {
        storageName : this.unitForm.get('unitName').value,
        userId: this.user.id
      };
      this.api.createUnit(credentials).subscribe(result => {
        alert("Unit Created");
        this.updateView();
       });
     
    } else {
      alert('Please Enter A Name');
    }
  }

  selectUnit(data : any): void {
    localStorage.setItem('selected-unit', JSON.stringify(data));
    location.reload();
  }

  searchByName() : void {
    const searchString = this.searchForm.get("searchInput").value?.toString();
    if (searchString) {
      let cred = {
        searchString: searchString
      }
      this.api.getItemsByName(cred).subscribe(items => {
        this.items = items;
      });
    }
  }

  
  clearFilter() : void {
    this.searchForm.reset();
    this.expireView = false;
    this.updateViewItems();
  }

  updateViewItems(): void {
    let cred = {
      storageId: this.storageUnit.id
    }
    this.api.getItemsByUnit(cred).subscribe(items => {
      this.items = items;
    });
  }


  updateView(): void {
    this.api.getStorageUnits().subscribe(units => {
      this.units = units;
    });
  }

  getExpireItems(): void {
    let cred = {
      userId: this.user.id
    }
    this.expireView = true;
    this.api.getExpireItems(cred).subscribe(items => {
      this.items=items;
    });

    this.expireView = true;
  }

  removeItem(data: any) : void {

    let cred = {
      itemId: data.id
    }
    this.api.removeItem(cred).subscribe(item => {
      if (item) {
        alert("Item has been deleted");
        localStorage.removeItem('selected-unit');
        location.reload();
      }
    });

    
  }

  leave() : void {
    localStorage.removeItem('selected-unit');
    location.reload();
  }
}
