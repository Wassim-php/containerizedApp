import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationModel } from '../../Models/ReservationModel';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  private baseUrl = 'http://localhost:8079/api/v1/reservation'

  constructor(private http: HttpClient) {}
  

  getAllReservation(): Observable<ReservationModel[]>{
      return this.http.get<ReservationModel[]>(`${this.baseUrl}/all`);
  }

  getReservationById(id: number): Observable<ReservationModel>{
    return this.http.get<ReservationModel>(`${this.baseUrl}/${id}`);
  }

  createReservation(reservation: ReservationModel): Observable<ReservationModel>{
    return this.http.post<ReservationModel>(`${this.baseUrl}/create`, reservation);
  }
}
