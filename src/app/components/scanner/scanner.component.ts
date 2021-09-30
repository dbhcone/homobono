import { Component, OnInit } from '@angular/core';
// import { BarcodeFormat } from '@zxing/library';
// let Html5QrcodeScanner  = require('html5-qrcode');
// import Html5QrcodeScanner from 'html5-qrcode'
// import QRScanner from 'qr-code-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  // allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  // public scannerEnabled: boolean = true;
  item = [{
    'name': 'Agatha Harkness',
    'played by': 'Kathryn Hahn',
    'Fictional universe': 'Marvel Universe',
    'Creator': 'Stan Lee'
  }]

  qrInfo = JSON.stringify(this.item);
  constructor() { }

  ngOnInit(): void {
  }

  startScanner() {
    console.log('we have started the scanner');
  }

  // trigger() {
  //   let html5QrcodeScanner = new Html5QrcodeScanner(
  //     "reader", { fps: 10, qrbox: 250 }, /* verbose= */ false);
  //   html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);
  // }

  onScanSuccess(decodedText: any, decodedResult: any) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }
  
  onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }



  public enableScanner() {
    // this.scannerEnabled = !this.scannerEnabled;
    // this.information = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  }

  public scanSuccessHandler($event: any) {
    // this.scannerEnabled = false;
    // this.information = "Espera recuperando información... ";
    console.log('event success', $event);

    // const appointment = new Appointment($event);
    // this.logService.logAppointment(appointment).subscribe(
    //   (result: OperationResponse) => {
    //     this.information = $event;
    //     this.transports = result.object;
    //     this.cd.markForCheck();
    //   },
    //   (error: any) => {
    //     this.information = "Ha ocurrido un error por favor intentalo nuevamente ... ";
    //     this.cd.markForCheck();
    //   });
  }
}
