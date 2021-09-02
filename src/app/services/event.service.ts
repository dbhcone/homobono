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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
};
  constructor(private client: Client) {}

  createEvent(event: FormData) {
    return this.client.POST(`${Events.create}`, event, this.httpOptions.headers);
  }

  getAllEvents () {
    return this.client.GET(`${Events.all}`);
  }

  deleteEvent(_id: string) {
    return this.client.POST(`${Events.deleteOne}`, {_id});
  }

}
