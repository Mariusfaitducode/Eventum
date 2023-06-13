import { Component } from '@angular/core';

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

  eventOfMonth: { day: number, event: Event }[] = []; 

  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();

  getCalendarDays(){
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
  
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
      if (day.number.length < 5) {
        if (day.number[0] < i){
          day.number.push(0);
        }
        else {
          day.number.unshift(0);
        }
      }
    }
  
  }

  ngOnInit(): void {  
    console.log(this.selectedMonth);
    console.log(this.getCalendarDays());
    console.log(this.daysOfWeek);
  }

}
