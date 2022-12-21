import firebase from "firebase";
import { useEffect, useState } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyB8qBDJ8ZIAe0wFhAkymWqXBYfxttTAQLU",
  authDomain: "mynewyearresolutions-27484.firebaseapp.com",
  projectId: "mynewyearresolutions-27484",
  storageBucket: "mynewyearresolutions-27484.appspot.com",
  messagingSenderId: "345771789633",
  appId: "1:345771789633:web:15ca4c9c208ae425b865c0",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var auth = firebase.auth();
var provider = new firebase.auth.GithubAuthProvider();

const useCards = () => {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    db.collection("card")
      .get()
      .then((snapshot: any) => {
        const data = snapshot.docs.map((doc: any) => {
          const { description, user } = doc.data();
          return {
            id: doc.id.toString(),
            description,
            user,
          };
        });
        setCarts(data);
      });
  }, []);
  const addCard = (card: any) => {
    db.collection("card").add({
        description: card,
        user: auth.currentUser?.displayName,
    });
  }
  return {
    carts,
    addCard
  };
};
export { auth, provider ,useCards};
