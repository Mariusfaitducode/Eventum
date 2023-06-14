import { Component } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';
import { User } from 'src/app/model/classes/user/user';
import { EventService } from 'src/app/model/services/event/event.service';
import { UserService } from 'src/app/model/services/user/user.service';

@Component({
  selector: 'app-agenda-content',
  templateUrl: './agenda-content.component.html',
  styleUrls: ['./agenda-content.component.css']
})
export class AgendaContentComponent {

  //daysOfWeek = ['Lundi' , 'Mardi', 'Jeudi', 'Mercredi', 'Vendredi', 'Samedi', 'Dimanche'];

  daysOfWeek: { day: string, number: number[] }[] = [
    { day: 'Lundi', number: [] },
    { day: 'Mardi', number: [] },
    { day: 'Mercredi', number: [] },
    { day: 'Jeudi', number: [] },
    { day: 'Vendredi', number: [] },
    { day: 'Samedi', number: [] },
    { day: 'Dimanche', number: [] },
  ];

  monthOfYear: string[] = ['Janvier' , 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre','Octobre', 'Novembre', 'Décembre'];

  user!: User;

  eventOfMonth: Event[] = []; 

  //selectedMonth = new Date().getMonth();
  selectedMonth = 3;
  selectedYear = new Date().getFullYear();

  constructor(
    private eventService: EventService,
    private userService: UserService ) {}

  getCalendarDays(){
    
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    
    //Nombre de jours dans le mois
    const totalDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    //Affecte au bon jour de la semaine le bon nombre de jour
    for (let day of totalDays) {
      const dayOfWeek = new Date(this.selectedYear, this.selectedMonth, day).getDay();
      this.daysOfWeek[dayOfWeek].number.push(day);
    }

    

    for (let i = 0; i < this.daysOfWeek.length; i++) {
      const day = this.daysOfWeek[i];
      if (day.number.length < 6 ) {
        if (day.number[0] < i){
          var maxLigne = 0;
          for (let i = 0; i < this.daysOfWeek.length; i++) {
            maxLigne = Math.max(maxLigne, this.daysOfWeek[i].number.length);
          }

          if (day.number.length < maxLigne ) {
            day.number.push(0);
          }
        }
        else {
          day.number.unshift(0);

          var maxLigne = 0;
          for (let i = 0; i < this.daysOfWeek.length; i++) {
            maxLigne = Math.max(maxLigne, this.daysOfWeek[i].number.length);
          }

          if (day.number.length < maxLigne ) {
            day.number.push(0);
          }
        }
      }
    }

    // :const userr :

    this.userService.getUserByToken().subscribe((user) => {
      //console.log("user on agenda"); // Check if the user object is retrieved correctly
      //console.log(user); // Check if the user object is retrieved correctly
      this.user = user;
      this.getEventOfMonth();
    });

    //console.log("this.user.id_utilisateur"+ this.user.id_utilisateur);
    //console.log("this.selectedMonth"+ this.selectedMonth);
    //console.log("this.selectedMonth"+ this.selectedYear);
  }


  getEventOfMonth(){
    this.eventService.getEventsByMonthAndUser(this.user.id_utilisateur, this.selectedMonth + 1, this.selectedYear).subscribe((events) => {
      console.log("events on agenda"); // Check if the user object is retrieved correctly
      console.log(events.length);
      this.eventOfMonth = events;
      let myday = new Date(this.eventOfMonth[0].date)
      console.log(myday.getDate());
    });
  }

  getDayOfEvent(date: Date): number {
    return date.getDate();
  }

  ngOnInit(): void {  
    console.log("load agenda");
    console.log(this.selectedMonth);
    this.getCalendarDays()
    
    console.log(this.daysOfWeek);
    console.log("eventOfMonth");
    console.log(this.eventOfMonth);
  }

}
