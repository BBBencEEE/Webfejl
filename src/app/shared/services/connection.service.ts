import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Connection } from '../models/Connection';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  collectionName = 'Connections'

  constructor(private afs: AngularFirestore) { }

  create(connection: Connection){
    connection.id = this.afs.createId();
    return this.afs.collection<Connection>(this.collectionName).doc(connection.id).set(connection);
  }

  getCollectionByUser(userId: string){
    return this.afs.collection<Connection>(this.collectionName, ref => ref.where('userId','==',userId)).valueChanges();
  }

  findByUserAndRoute(userId: string, routeId: string){
    return this.afs.collection<Connection>(this.collectionName, ref => ref.where('userId','==',userId).where('routeId','==',routeId).limit(1)).valueChanges();
  }

  delete(id: string){
    return this.afs.collection<Connection>(this.collectionName).doc(id).delete();
  }

}
