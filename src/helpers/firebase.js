import firebase from 'firebase'
import 'firebase/firestore'
import {config} from './firebaseConfig'

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true});

export const db = firebaseApp.firestore();
