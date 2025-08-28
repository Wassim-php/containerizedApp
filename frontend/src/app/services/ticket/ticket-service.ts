import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketModel } from '../../Models/TicketModel';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private baseURL = 'http://localhost:8079/api/v1/tickets'
  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<TicketModel[]>{
    return this.http.get<TicketModel[]>(`${this.baseURL}/all`);
  }

  getTicketById(id: number): Observable<TicketModel>{
    return this.http.get<TicketModel>(`${this.baseURL}/${id}`);
  }
}
