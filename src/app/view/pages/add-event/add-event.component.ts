import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/classes/categorie/categorie';
import { EventService } from 'src/app/model/services/event/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit{
  public titre: string = ""
  public description: string = ""
  public date: Date = new Date()
  public heure: string=""
  public lieu: string=""
  public is_public: boolean = false
  public id_categorie: number = 0
  public imageFileName: string = ""

  public list_categorie!: Categorie[]
  

  constructor(private router: Router, private service: EventService) {
    this.service.getCategories().subscribe((data: Categorie[]) => {
      this.list_categorie = data;
    });
  }

  OnConfirm(): void {
    console.log(this.titre);
    console.log(this.description);
    console.log(this.date);
    console.log(this.heure);
    console.log(this.lieu);
    console.log(this.is_public);
    console.log(this.id_categorie);
    console.log(this.imageFileName);
    this.service.addEvent(this.titre, this.description, this.date, this.heure, this.lieu, this.is_public, this.id_categorie, 0, this.imageFileName).subscribe((data: boolean) => {
      console.log(data);

    });
    }

  ngOnInit(): void {

  }

  onImageChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.imageFileName = files[0].name;
    }
  }

}
