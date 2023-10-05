import { Component, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription, filter, map } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: [  ]
})
export class CargandoComponent implements OnDestroy {

  constructor( 
    public alertService: AlertService
              ) {


  }
  ngOnDestroy(): void {
  }

}
