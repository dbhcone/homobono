import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
  uploadPath = null;
  events: any[] = [];
  pageEvent?: PageEvent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  pageSize = 10;
  constructor(
    private eventService: EventService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.fetchAllEvents();
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  fetchAllEvents() {
    this.eventService.getAllEvents().subscribe(async (resp: any) => {
      this.events = resp.data.events;
      this.dataSource.data = this.events;
      this.uploadPath = resp.data.uploadPath;
    });
  }

  displayFlyer(flyerFileName: string) {
    return `${this.uploadPath}/${flyerFileName}`;
  }

  viewDetails(id: string) {
    this.router.navigate(['events', id]);
  }

  addToCart(event: any) {
    console.log('adding to add this content to cart', event);
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
}
