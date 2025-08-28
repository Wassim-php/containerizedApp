import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { ReservationList } from './components/reservation/reservation-list/reservation-list';
import { ReservationDetails } from './components/reservation/reservation-details/reservation-details';
import { TicketList } from './components/ticket/ticket-list/ticket-list';
import { TicketComponent } from './components/ticket/ticket-component/ticket-component';
import { CreateReservation } from './components/reservation/create-reservation/create-reservation';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'reservations',
        component: ReservationList
    },
    {
        path: 'reservations/create',
        component: CreateReservation
    },
    {
        path: 'reservations/:id',
        component: ReservationDetails
    },
    {
        path: 'tickets/:id',
        component: TicketComponent
    },
    {
        path: 'tickets',
        component: TicketList
    },
];
