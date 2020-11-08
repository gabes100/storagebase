import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: any;

  constructor( 
    private router : Router,
    private api : ApiService,
    private data : DataService)  { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user-login'));
  
    if (!this.user){
      this.router.navigate(['/']);
    }
  
  }

}
