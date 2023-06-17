import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-right-pane',
  templateUrl: './right-pane.component.html',
  styleUrls: ['./right-pane.component.css']
})
export class RightPaneComponent {

  page!: string;

  visit!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {

      this.page = urlSegments[0]?.path;
      this.visit = urlSegments[1]?.path;
      console.log('Chemin de la route active :', this.page);
    });
  }

}
