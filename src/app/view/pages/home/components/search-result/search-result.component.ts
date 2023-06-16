import { Component } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  chooseEvent: boolean = false;

  chooseCategorie: boolean = false;
  chooseDate: boolean = false;
  chooseLieu: boolean = false;

  constructor() { }

  selectEvent(){

    this.chooseEvent = true;

  }

  selectUser(){
    this.chooseEvent = false;
    this.chooseDate = false;
    this.chooseLieu = false;
    this.chooseCategorie = false;
  }

  selectCategorie(){

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

}
