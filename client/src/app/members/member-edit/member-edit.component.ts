import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
@ViewChild('editForm') editForm: NgForm;
@HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
  if(this.editForm.dirty){
    $event.returnValue = true;
  }
}
 member:Member;
 user:User;
 
  constructor(private accountService: AccountService, 
        private membersService: MembersService,
        private toastrService: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(currentUser=>{
      this.user = currentUser;
    })
  }

  ngOnInit(): void {
    this.loadMember()
  }
  loadMember(){
    this.membersService.getMember(this.user.username).subscribe(member=>{
      this.member = member;
      console.log("Member: "+member);
    })
  } 
  updateMember(){
    console.log(this.member)
    this.membersService.updateMember(this.member).subscribe(()=>{
      this.toastrService.success("Profile updated successfully");
      this.editForm.reset(this.member);
      
    });

  }

}
