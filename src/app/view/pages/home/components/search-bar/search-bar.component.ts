import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/model/classes/user/user';
import { Event } from 'src/app/model/classes/event/event';
import { SearchService } from 'src/app/model/services/search/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  public text: string = "";
  isSearching : boolean = false;

  userArray : User[] = [];
  eventArray : Event[] = [];

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private searchService: SearchService) { }

  

  chooseEvent: boolean = false;

  chooseCategorie: boolean = false;
  chooseDate: boolean = false;
  chooseLieu: boolean = false;

  selectEvent(){
    this.searchInput.nativeElement.focus();
    this.chooseEvent = true;

  }

  selectUser(){
    this.searchInput.nativeElement.focus();
    this.chooseEvent = false;
    this.chooseDate = false;
    this.chooseLieu = false;
    this.chooseCategorie = false;
  }

  selectCategorie(){
    this.searchInput.nativeElement.focus();

    if (this.chooseCategorie == true){
      this.chooseCategorie = false;
    }
    else{
      if (this.chooseEvent == false){
        this.chooseEvent = true;

      }
      this.chooseCategorie = true;
      this.chooseDate = false;
      this.chooseLieu = false;
    }
  }

  selectDate(){
    this.searchInput.nativeElement.focus();

    if (this.chooseDate == true){
      this.chooseDate = false;
    }
    else{
      if (this.chooseEvent == false){
        this.chooseEvent = true;

      }
      this.chooseDate = true;
      this.chooseCategorie = false;
      this.chooseLieu = false;
    }
  }

  selectLieu(){
    this.searchInput.nativeElement.focus();
    

    if (this.chooseLieu == true){
      this.chooseLieu = false;
    }
    else{
      if (this.chooseEvent == false){
        this.chooseEvent = true;

      }
      this.chooseLieu = true;
      this.chooseDate = false;
      this.chooseCategorie = false;
    }
  }


  onSearchBarFocus(){
    this.isSearching = true;

    // Vérifie si la taille des résultats dépasse la taille de la page
  }

  searchBarClose(){
    this.isSearching = false;

    // Vérifie si la taille des résultats dépasse la taille de la page
  }



  onSearchBarBlur(){

    // console.log("La barre de recherche a perdu le focus !");

    // console.log("blur");
    // this.isSearching = false;

    // Vérifie si la taille des résultats dépasse la taille de la page
  }

  onSearch(){

   

    if (this.text == "") {

      this.userArray = [];

      // No research

      // this.userService.getUserByToken().subscribe((data: User) => {
      //   console.log(data);
      //   this.getListConversationOfUser(data.id_utilisateur);
      // });
    } else {

      if (!this.chooseEvent){
        // Search for users
        this.searchService.getSearchedUsers(this.text).subscribe((data: User[]) => {
          this.userArray = [];
          this.userArray = data;
        })
      }
      else{
        this.userArray = [];

        if (this.chooseCategorie){
          this.searchService.getSearchedEvents(this.text, "categorie").subscribe((data: Event[]) => {
            
            this.eventArray = [];
            this.eventArray = data;
          });
        }
        else if (this.chooseDate){
          this.searchService.getSearchedEvents(this.text, "date").subscribe((data: Event[]) => {
            
            this.eventArray = [];
            this.eventArray = data;
          });
        }
        else if (this.chooseLieu){
          this.searchService.getSearchedEvents(this.text, "lieu").subscribe((data: Event[]) => {
            
            this.eventArray = [];
            this.eventArray = data;
          });
        }
        else{
          this.searchService.getSearchedEvents(this.text, "titre").subscribe((data: Event[]) => {
          
            this.eventArray = [];
            this.eventArray = data;
          });
        } 
      }
    }
    // const windowHeight = window.innerHeight;
    // const searchBarHeight = document.getElementById('searchInput')!.offsetHeight;
    // const searchContentHeight = document.getElementById('searchContent')!.offsetHeight;

    // this.isContentScrollable = searchContentHeight + searchBarHeight > windowHeight;

    // console.log("search height : "+ searchContentHeight + '  '+searchBarHeight);
    // console.log("window height : "+windowHeight);
    // console.log("is scrollable : "+this.isContentScrollable);
  }

}
