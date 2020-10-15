import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDRCFPgfCtotzBySXTYMfVmU4e4Q_a9jrM",
  authDomain: "chat-app-7b154.firebaseapp.com",
  databaseURL: "https://chat-app-7b154.firebaseio.com",
  projectId: "chat-app-7b154",
  storageBucket: "chat-app-7b154.appspot.com",
  messagingSenderId: "378529246498",
  appId: "1:378529246498:web:1ccb30bfdf368a9648897b"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const rtdb = firebase.database();

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  }
  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  }
  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  }
  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  }
  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref(".info/connected").on("value", async snapshot => {
    if (!snapshot.val()) {
      userDoc.update({
        status: isOfflineForFirestore
      })
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineForRTDB);
    userDoc.update({
      status: isOnlineForFirestore
    })
  })
}

export { db, firebase };
