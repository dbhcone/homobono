import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Paragraphs } from 'src/app/utils/paragraphs';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  // Example data of events
  events: any[] = [];
  // MatPaginator Output
  pageEvent?: PageEvent;

  pageSize = 10;
  constructor() {}

  ngOnInit(): void {
    this.buildEvents();
  }

  buildEvents() {
    for (let i = 0; i < 50; i++) {
      let event = {
        _id: i,
        title: `Title #${i}`,
        date: 'yyyy-MM-dd hh:mm:ss z',
        description: Paragraphs[i % 9],
        img: `assets/public_events/event_${i % 10}.jpg`,
      };
      this.events.push(event);
    }
  }
}
