import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/classes/user/user';
import { UserService } from 'src/app/model/services/user/user.service';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {
  public followersArray: User [] = [];
  public followingArray: User [] = [];
  public link: string = "profil";

  public isFollowers: boolean = true;

  public id!: number;

  constructor(private service : UserService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    // V"rifier si on est sur notre profil ou sur un autre
    

    this.service.getUserByToken().subscribe((user) => {
      this.id = user.id_utilisateur;

      console.log(this.id);
      this.service.getFollowers(this.id).subscribe((data: User[]) => {

        console.log(data)

        this.followersArray = data;
      }
      );

      this.service.getFollowings(this.id).subscribe((data: User[]) => {
        this.followingArray = data;
      }
      );
    });
  }

  public changeFollows(){
      this.isFollowers = !this.isFollowers;
  }

}
