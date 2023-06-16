import { Component, ElementRef, HostListener, QueryList, ViewChild,  ViewChildren } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';
import { User } from 'src/app/model/classes/user/user';
import { EventService } from 'src/app/model/services/event/event.service';
import { ShareDataService } from 'src/app/model/services/share/share-data.service';
import { UserService } from 'src/app/model/services/user/user.service';

@Component({
  selector: 'app-agenda-content',
  templateUrl: './agenda-content.component.html',
  styleUrls: ['./agenda-content.component.css']
})
export class AgendaContentComponent{

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
    private userService: UserService,
    private shareService: ShareDataService ) {}

  incrementMonth(): void{
    if (this.selectedMonth < 11){
      this.selectedMonth++;
    }
    else{
      this.selectedMonth = 0;
      this.selectedYear++;
    }
    this.getCalendarDays();
  }

  decrementMonth(): void{
    if (this.selectedMonth > 0){
      this.selectedMonth--;
    }
    else{
      this.selectedMonth = 11;
      this.selectedYear--;
    }
    this.getCalendarDays();
  }

  getCalendarDays(){

    for (let day of this.daysOfWeek) {
      day.number = [];
    }

    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

    //Nombre de jours dans le mois
    const totalDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    //Affecte au bon jour de la semaine le bon nombre de jour
    for (let day of totalDays) {
      const dayOfWeek = new Date(this.selectedYear, this.selectedMonth, day-1).getDay();
      this.daysOfWeek[dayOfWeek].number.push(day);
    }

    for (let i = 0; i < this.daysOfWeek.length; i++) {
      const day = this.daysOfWeek[i];
      if (day.number.length < 6 ) {
        if (day.number[0] <= i+1){
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
    this.eventOfMonth = [];
    this.eventService.getEventsByMonthAndUser(this.user.id_utilisateur, this.selectedMonth + 1, this.selectedYear).subscribe((events) => {
      console.log("events on agenda"); // Check if the user object is retrieved correctly
      console.log(events.length);
      this.eventOfMonth = events;
    });
  }


  getDayOfEvent(date: Date): number {
    return date.getDate();
  }

  eventOfMonthContain(number: number): boolean {
    for (let event of this.eventOfMonth) {
      if (event.date instanceof Date && event.date.getDate() == number){
        return true;
      }
    }
    return false;
  }

  updateEventDayData(number: number): void {

    console.log("updateEventDayData");

    var eventOfDay : Event[] = [];

    for (let event of this.eventOfMonth) {

      if (event.date instanceof Date && event.date.getDate() == number){
        eventOfDay.push(event);
      }
    }
    console.log(eventOfDay);

    const date = new Date(this.selectedYear, this.selectedMonth, number);

    this.shareService.setAgendaDayEvent(date, eventOfDay);
  }



  ngOnInit(): void {
    // console.log("load agenda");
    // console.log(this.selectedMonth);
    this.getCalendarDays()

    // console.log(this.daysOfWeek);
    // console.log("eventOfMonth");
    // console.log(this.eventOfMonth);
  }




//   @HostListener('window:resize', ['$event'])
//   onWindowResize(event: any) {

//     const screenWidth = window.innerWidth;

//     const dayContentItems = Array.from(document.getElementsByClassName('.day-content-item')) as HTMLElement[];

//     for (const dayContentItem of dayContentItems) {

//       const eventElements = Array.from(dayContentItem.getElementsByClassName('.event')) as HTMLElement[];

//       if (eventElements.length > 0) {

//         if (screenWidth < 1000) {
//           // Masquer le contenu de la div et changer la couleur du background du parent

//           for (const eventElement of eventElements) {
//             eventElement.style.display = 'none';
//           }
//           dayContentItem.style.backgroundColor = 'red'; // Remplacez par la couleur souhaitée
//         } else {
//           // Afficher le contenu de la div et restaurer la couleur du background du parent
//           for (const eventElement of eventElements) {
//             eventElement.style.display = 'block';
//           }
//           dayContentItem.style.backgroundColor = ''; // Rétablir la couleur par défaut du parent
//         }

//       }
//     }
//   }

 }
