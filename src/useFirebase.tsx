import firebase from "firebase";
import React, { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB8qBDJ8ZIAe0wFhAkymWqXBYfxttTAQLU",
  authDomain: "mynewyearresolutions-27484.firebaseapp.com",
  projectId: "mynewyearresolutions-27484",
  storageBucket: "mynewyearresolutions-27484.appspot.com",
  messagingSenderId: "345771789633",
  appId: "1:345771789633:web:15ca4c9c208ae425b865c0",
};

interface FirebaseContext {
  auth: firebase.auth.Auth;
  provider: firebase.auth.GithubAuthProvider;
  card: any[];
  addCard: (
    card: string
  ) => Promise<
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  >;
  user: {
    displayName: string;
    isLoading: boolean;
    isSuccessful: boolean;
  };
  refecthData: () => void;
}
firebase.initializeApp(firebaseConfig);

const InitialState = () => {
  const [card, setcard] = useState([]);
  const [refecth, setRefecth] = useState(false);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GithubAuthProvider();
  useEffect(() => {
    db.collection("card")
      .orderBy("user", "asc")
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
        setcard(data);
      });
  }, [refecth]);
  console.log("auth cambio",auth);
  useEffect(() => {

    if (provider) {
      setUser({
        displayName: auth.currentUser?.displayName,
        isLoading: false,
        isSuccessful: true,
      });
    } else {
      setUser({
        displayName: "",
        isLoading: false,
        isSuccessful: false,
      });
    }
  }, [firebase.auth()]);
  const [user, setUser] = useState<any>({
    displayName: "",
    isLoading: true,
    isSuccessful: false,
  });
  const addCard = async (card: string) => {
    return db.collection("card").add({
      description: card,
      user: auth.currentUser?.displayName,
    });
  };
  const refecthData = () => {
    setRefecth(!refecth);
  };
  return { auth, provider, refecthData, card, addCard, user };
};

const FirebaseContext = React.createContext<FirebaseContext>(
  {} as FirebaseContext
);
export const useFirebase = () => React.useContext(FirebaseContext);

export const FirebaseProvider = ({ children }: any) => {
  const state = InitialState();
  return (
    <FirebaseContext.Provider value={state}>
      {children}
    </FirebaseContext.Provider>
  );
};
