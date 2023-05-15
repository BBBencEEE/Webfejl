import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { PlaneRouteService } from 'src/app/shared/services/plane-route.service';
import { Planeroute } from 'src/app/shared/models/Planeroute';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnChanges, OnInit{

  planeroute = new FormGroup({
    honnan: new FormControl(''),
    hova: new FormControl(''),
    mikor: new FormControl(''),
    hely: new FormControl('')
  });

  routes: Array<Planeroute> = [];
  

  

  constructor(private routeService: PlaneRouteService){}

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

  onDelete(id: string){
      this.routeService.delete(id).then(_ => {
        console.log(id);
        console.log('Route deleted successfully');
      }).catch(error => {
        console.error(error);
      });
  }

  onSubmit(){
    const proute: Planeroute = {
      id: 'null',
      honnan: this.planeroute.get('honnan')?.value as string,
      hova: this.planeroute.get('hova')?.value as string,
      mikor: this.planeroute.get('mikor')?.value as string,
      hely: Number(this.planeroute.get('hely')?.value),
    }
    proute.mikor.replace('T',' ');
    this.routeService.create(proute).then(_ => {
      console.log('Route added successfully');
    }).catch(error => {
      console.error(error);
    });
  }

}
