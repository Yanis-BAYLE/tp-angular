import { Component, signal } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

type Status = 'En attente' | 'Connecté' | 'Erreur' | 'Terminé';

@Component({
  imports: [AsyncPipe],
  selector: 'app-sensor',
  styleUrl: './sensor.css',
  templateUrl: './sensor.html',
})
export class Sensor {
  sensorData$: Observable<number | null> | null = null;
  status = signal<Status>('En attente');

  sensor$ = new Observable<number>((observer) => {
    let counter = 0;
    const intervalId = setInterval(() => {
      const temp = Math.floor(Math.random() * 61);
      observer.next(temp);
      if (temp > 50) {
        clearInterval(intervalId);
        observer.error('Sonde en surchauffe');
        return;
      }
      counter++;
      if (counter === 5) {
        clearInterval(intervalId);
        observer.complete();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  });

  start(): void {
    this.status.set('Connecté');
    this.sensorData$ = this.sensor$.pipe(
      catchError((err) => {
        console.error(err);
        this.status.set('Erreur');
        return EMPTY;
      }),
      finalize(() => {
        if (this.status() === 'Connecté') this.status.set('Terminé');
      }),
    );
  }

  stop(): void {
    this.status.set('En attente');
    this.sensorData$ = null;
  }
}
