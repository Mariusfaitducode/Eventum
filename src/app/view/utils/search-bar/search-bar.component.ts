import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  public text: string = "";
  isSearching : boolean = false;

  constructor() { }

  onSearchBarFocus(){
    this.isSearching = true;
  }

  onSearch(){
    if (this.text == "") {
      // this.userService.getUserByToken().subscribe((data: User) => {
      //   console.log(data);
      //   this.getListConversationOfUser(data.id_utilisateur);
      // });
    } else {
      // this.service.getSearchedUsers(this.text).subscribe((data: User[]) => {
      //   this.UserArray = [];
      //   this.UserArray = data;
      // })
    }
  }

}
