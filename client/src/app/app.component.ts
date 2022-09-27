import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'THE DATING APP';
  users:any;
  constructor(private http:  HttpClient){}
  ngOnInit(): void {
     this.getUsers();
  }
  getUsers(){
    this.http.get("https://localhost:7226/api/users").subscribe({
      next: response => this.users = response,
      error: error => console.log(error)
    }
    )
  }
}
