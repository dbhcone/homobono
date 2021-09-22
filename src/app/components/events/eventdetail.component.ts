import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.scss'],
})
export class EventdetailComponent implements OnInit, OnDestroy {
  eventId: any;
  uploadPath: any;
  pricings: any;
  event: any;
  otherEvents: any;
  subscription: Subscription;
  constructor(
    private actRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {
    this.subscription = this.actRoute.paramMap.subscribe((pm) => {
      if(pm.has('id')) {
        this.eventId = pm.get('id');
        console.log('id changed', this.eventId);
        this.getEventDetails(this.eventId);
        this.getUpcomingEvents();
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getEventDetails(id: string) {
    this.eventService.getEvent(id).subscribe(async (resp: any) => {
      this.event = resp.data.event;
      this.uploadPath = resp.data.uploadPath;
      this.pricings = resp.data.pricings;
      console.log('event', this.event);
    });
  }

  getUpcomingEvents () {
    this.eventService.getAllEvents().subscribe(async (resp: any) => {
      let allevents = <[]>resp.data.events;
      console.log('all events', resp.data);
      this.otherEvents = allevents.filter((ev: any) => ev._id !== this.eventId);
      console.log('other events', this.otherEvents)
    }, (err: any) => {
      console.log('error', err);
    })
  }

  ngOnInit(): void {}

  displayFlyer() {
    return this.displayImage(this.event?.flyer?.filename);
  }
  
  displayImage(fileName: string) {
    return `${this.uploadPath}/${fileName}`;
  }

  viewDetails(id: string) {
    this.router.navigate(['events', id]);
  }

}