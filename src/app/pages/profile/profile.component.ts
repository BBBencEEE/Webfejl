import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Connection } from 'src/app/shared/models/Connection';
import { Planeroute } from 'src/app/shared/models/Planeroute';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { PlaneRouteService } from 'src/app/shared/services/plane-route.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  myRoutes: Array<Planeroute> = [];
  myConnections: Array<Connection> = [];

  constructor(private routeService: PlaneRouteService,
    private userService: UserService,
    private connectionService: ConnectionService,
    private router: Router){}

    ngOnInit(): void {
      const user = JSON.parse(localStorage.getItem('user') as string);
      this.connectionService.getCollectionByUser(user.uid).subscribe(data => {
        this.myConnections = data;
        for (var c of this.myConnections){
          this.routeService.findById(c.routeId).subscribe(d => {
            for(var a of d){
              this.myRoutes.push(a);
            }
          });
        }
      });
    }

    onDelete(r: Planeroute){
      const user = JSON.parse(localStorage.getItem('user') as string);
      this.connectionService.findByUserAndRoute(user.uid,r.id).subscribe(data => {
        for(var c of data){
          this.connectionService.delete(c.id);
          this.router.navigateByUrl('/main');
          return;
        }
      });
      r.hely += 1;
      this.routeService.update(r);
    }

}
