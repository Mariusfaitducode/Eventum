import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareDataService } from 'src/app/model/services/share/share-data.service';
import { Event } from 'src/app/model/classes/event/event';

@Component({
  selector: 'app-day-section',
  templateUrl: './day-section.component.html',
  styleUrls: ['./day-section.component.css']
})
export class DaySectionComponent implements OnInit {

  eventOfDay: Event[] = [];

  constructor(
    private shareService: ShareDataService,
  ) {}

  ngOnInit() {
    this.shareService.agendaDayEvent.subscribe((data: Event[]) => {
      console.log("data actualisation");
      this.eventOfDay = data;
    });
  }

}
