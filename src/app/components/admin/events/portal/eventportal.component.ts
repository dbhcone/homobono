import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shoppingcart.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-eventportal',
  templateUrl: './eventportal.component.html',
  styleUrls: ['./eventportal.component.scss'],
})
export class EventPortalComponent implements OnInit, OnDestroy {
  eventId: any;
  pricings: any;
  event: any;
  otherEvents: any;
  subscription: Subscription;

  formValueJson: string = "";
  submitting: boolean = false;
  scanSuccess: boolean = false;
  // allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  public scannerEnabled: boolean = false;


  constructor(
    private actRoute: ActivatedRoute,
    private eventService: EventService
  ) {
    this.subscription = this.actRoute.paramMap.subscribe((pm) => {
      if(pm.has('id')) {
        this.eventId = pm.get('id');
        console.log('id changed', this.eventId);
        
      }
    })
  }

  ngOnInit() {
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startScanner() {
    console.log('we have started the scanner');
    this.scannerEnabled = true;
  }

  stopScanner() {
    console.log('we are stopping the scanner');
    this.scannerEnabled = false;
  }

  public scanSuccessHandler($event: any) {
    this.stopScanner();
    console.log('event success', $event);

  }

   
}
