import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EventService } from 'src/app/services/event.service';
import { Paragraphs } from 'src/app/utils/paragraphs';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  uploadPath = null;
  // Example data of events
  events: any[] = [];
  // MatPaginator Output
  pageEvent?: PageEvent;

  pageSize = 10;
  constructor(private eventService: EventService) {
    this.fetchAllEvents();
  }

  ngOnInit(): void {}

  fetchAllEvents() {
    this.eventService.getAllEvents().subscribe(async (resp: any) => {
      this.events = resp.data.events;
      this.uploadPath = resp.data.uploadPath;
    });
  }

  displayFlyer(flyerFileName: string) {
    return `${this.uploadPath}/${flyerFileName}`;
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
