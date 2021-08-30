import { Injectable } from '@angular/core';
import { General } from '../api/endpoints';
import { IContactUs } from '../models/contactus.interface';
import { Client } from '../utils/client';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private client: Client) {}

  contactUs(contactus: IContactUs) {
    return this.client.POST(`${General.contactus}`, contactus);
  }
}
