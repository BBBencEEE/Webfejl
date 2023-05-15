import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlaneRouteService } from 'src/app/shared/services/plane-route.service';
import { Planeroute } from 'src/app/shared/models/Planeroute';
import { Connection } from 'src/app/shared/models/Connection';
import { UserService } from 'src/app/shared/services/user.service';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,OnChanges {
  routes: Array<Planeroute> = [];
  

  

  constructor(private routeService: PlaneRouteService,
              private userService: UserService,
              private connectionService: ConnectionService,
              private router: Router){}

  ngOnInit(): void {
    this.routeService.getAll().subscribe(data => {
      this.routes = data;
    });
  }

  ngOnChanges(): void {
    this.routeService.getAll().subscribe(data => {
      console.log(data);
      this.routes = data;
    });
  }

  onFoglalas(r: Planeroute){
    const user = JSON.parse(localStorage.getItem('user') as string);
    const connection: Connection = {
      id: '1',
      routeId: r.id,
      userId: user.uid
    }
    if(r.hely > 0){
      r.hely -= 1;
      this.routeService.update(r);
    }else{
      console.error('Nincs több hely');
      alert('Nincs több hely');
      return;
    }
    

    //foglalas letrehozasa
    this.connectionService.create(connection).then(_ => {
      console.log('Sikeres foglalas');
      this.router.navigateByUrl('/profile');
    }).catch(error => {
      console.error(error);
    })

  }


}
