import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/classes/categorie/categorie';
import { EventService } from 'src/app/model/services/event/event.service';
import { UserService } from 'src/app/model/services/user/user.service';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/model/services/file/file.service';
import { HttpClient } from '@angular/common/http';

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
  public id_user: number = 0
  public selectedImage: File = new File([], "");

  public list_categorie!: Categorie[]
  

  constructor(private service: EventService, private userService: UserService, private fileService: FileService, private http: HttpClient) {
    this.service.getCategories().subscribe((data: Categorie[]) => {
      console.log(data);
      this.list_categorie = data;
    });
    this.userService.getUserByToken().subscribe((data: any) => {
      console.log(data);
      this.id_user = data.id_utilisateur;
    });
  }

  OnConfirm(): void {
    this.heure = this.heure.padStart(5, '0') + ':00';

    this.service.addEvent(this.titre, this.description, this.date, this.heure, this.lieu, this.is_public, this.id_categorie, this.id_user, 'images/evenements/' + this.selectedImage.name).subscribe((data: boolean) => {
      console.log(data);
      if(data) {
        this.http.post('https://file.io', this.selectedImage)
        .subscribe(event => {
          console.log('done')
        })
      }
    });
  }

  ngOnInit(): void {

  }

  onImageChange(event: any): void {
     this.http.post('http://localhost/eventum/Eventum_Angular', event.target.files[0])
     .subscribe(event => {
       console.log('done')
     })
  }

  upload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('http://localhost/eventum/Eventum_Angular', formData)
      .subscribe(event => {
        console.log('done')
      })
  }



}
