import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '../api/endpoints';
import { Client } from '../utils/client';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${sessionStorage.getItem('access-token')}`,
    }),
};
  constructor(private client: Client) {}

  createEvent(event: FormData) {
    return this.client.POST(`${Events.create}`, event, this.httpOptions.headers);
  }

  getAllEvents () {
    return this.client.GET(`${Events.all}`);
  }

  updateEvent(id: string, event: any) {
    return this.client.PATCH(`${Events.update}`, id, event);
  }

  getEvent(_id: string) {
    return this.client.GET(`${Events.getOne}/${_id}`)
  }

  deleteEvent(_id: string) {
    return this.client.POST(`${Events.deleteOne}`, {_id});
  }


  //#region Event pricings
  getEventPricings(eventId: string) {
    return this.client.GET(`${Events.pricings}/${eventId}`)
  }

  addPricing(eventId: string, pricing: any) {
    return this.client.POST(`${Events.addPricing}/${eventId}`, pricing);
  }
  updatePricing(id: string, pricing: any) {
    return this.client.PATCH(`${Events.updatePricing}`, id, pricing);
  }
  //#endregion

  //#region Purchases
  makePayment(user: any, items: []) {
    return this.client.POST(Events.purchase, {user, items});
  }

}
