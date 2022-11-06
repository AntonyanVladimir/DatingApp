import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  currentUser: User = null;
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user=>{
      this.currentUser = user;
    });
  }
  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  
  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }
}
