import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RightPaneComponent } from '../../right-pane/right-pane.component';
import { LeftPaneComponent } from '../../left-pane/left-pane.component';
import { User } from '../../../model/classes/user/user';
import { UserService } from '../../../model/services/user/user.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],

})
export class ProfilComponent implements OnInit {
  public userProfil: User = new User(0, "test", "test", "test", "test", "test", "test", false, "test");

  constructor(private service : UserService) {
    console.log('UserService constructor called');
    
  }

  ngOnInit(): void {
    this.service.getUserById(2).subscribe((data : User) => {

      this.userProfil = data;
    });
  }
}
