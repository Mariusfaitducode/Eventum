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

  public id!: number;

  constructor(private service : UserService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    // V"rifier si on est sur notre profil ou sur un autre
    this.route.params.subscribe((params) => {
      var id = +params['id'];
      // Check if the id is correct
      console.log("id ="+id);

      if (Number.isNaN(id)){
        this.service.getUserByToken().subscribe((user) => {
          this.id = user.id_utilisateur;

        });
      }
      else{
        this.id = id;
      }

    });
    console.log(this.id);
    this.service.getFollowers(this.id).subscribe((data: User[]) => {
      this.followersArray = data;
    }
    );

    this.service.getFollowings(this.id).subscribe((data: User[]) => {
      this.followingArray = data;
    }
    );
  }

}
