import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(x=>{
      this.users = x;
    })
  }
;
  public users: User[] = [];
  str: string[] = []
  userEmail!:string;
  credits!: number;
  showUserCredits(){
    this.credits= this.users.find(x=>x.email == this.userEmail)?.parkCredits!;
  }
  cashOut(){
    this.userService.cashOut(this.users.find(x=>x.email == this.userEmail)?.id!).subscribe();
  }
}
