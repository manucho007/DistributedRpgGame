import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { User } from '../interfaces/user';


// The T is a Typescript generic that allows us to use our custom interfaces
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore) { }

  // Function generics to reference doc or collection
  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  // Functions that call the generics and get the data from backend
  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(map(doc => {
      return doc.payload.data() as T;
    }));
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(docs => {
      return docs.map(a => a.payload.doc.data()) as T[];
    }));
  }

  // return the collection with the ids
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }) as T[];
    }));
  }

  // Firebase server timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  // ****Custom Methods
  // Update a Document
  update<T>(ref: DocPredicate<T>, data: any) {
    return this.doc(ref).update({
      ...data,
      updatedAt: this.timestamp
    });
  }

  // update a specific array in a specific document
  updateFieldAry<T>(path: string, ref: string, data: object) {
    const timestamp = this.timestamp;
    const boardRef = this.afs.collection(path).doc(ref);
    console.log('service');
    console.log(path, ref, data);


    boardRef.update({
      users: firebase.firestore.FieldValue.arrayUnion({ user: data, score: 0 }),
      updatedAt: timestamp,
    }).catch((err) => {
      console.log(err);
    });
  }


  incrementUserScore<T>(path: string, ref: string, user: User, score: number, prevScore: number) {
    const timestamp = this.timestamp;

    const boardRef = this.afs.collection(path).doc(ref);
    boardRef.update({
      users: firebase.firestore.FieldValue.arrayRemove({ user, score: prevScore })
    }).then(() => {
      boardRef.update({
        spins: firebase.firestore.FieldValue.increment(1),
        updatedAt: timestamp,
        users: firebase.firestore.FieldValue.arrayUnion({ user, score })
      })
        .catch((err) => {
          console.log(err);
        });
    })
      .catch((err) => {
        console.log(err);
      });
  }



  // Delete a document
  delete<T>(ref: DocPredicate<T>) {
    this.doc(ref).delete();
  }

  // Create a Document with a manual ID
  set<T>(ref: DocPredicate<T>, data: any) {
    const timestamp = this.timestamp;
    return this.doc(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }
  // Create a Doc with an automated ID
  add<T>(ref: CollectionPredicate<T>, data) {
    const timestamp = this.timestamp;
    return this.col(ref).add({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }
}
