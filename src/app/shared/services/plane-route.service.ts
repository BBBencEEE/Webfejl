import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Planeroute } from '../models/Planeroute';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaneRouteService {

  collectionName = 'Routes'

  constructor(private afs: AngularFirestore) { }

  create(pr: Planeroute){
    pr.id = this.afs.createId();
    return this.afs.collection<Planeroute>(this.collectionName).doc(pr.id).set(pr);
  }

  getAll(){
    return this.afs.collection<Planeroute>(this.collectionName).valueChanges();
  }

  delete(id: string){
    return this.afs.collection<Planeroute>(this.collectionName).doc(id).delete();
  }

  update(pr: Planeroute){
    return this.afs.collection<Planeroute>(this.collectionName).doc(pr.id).set(pr);
  }

  findById(rId: string){
    return this.afs.collection<Planeroute>(this.collectionName,ref => ref.where('id','==',rId)).valueChanges();
  }

  
}
