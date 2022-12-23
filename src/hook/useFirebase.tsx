import firebase from "firebase";
import { useEffect, useState, useContext, createContext } from "react";
import { useModal } from "./useModal";
import firebaseConfig from "../../firebaseConfig";

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
  };
  refecthData: () => void;
}

firebase.initializeApp(firebaseConfig);

const InitialState = () => {
  const [user, setUser] = useState<any>({
    displayName: "",
    isLoading: true,
  });

  const [card, setcard] = useState([]);
  const [refecth, setRefecth] = useState(false);
  const db = firebase.firestore();
  let auth = firebase.auth();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ displayName: user.displayName, isLoading: false });
      } else {
        setUser({ displayName: "", isLoading: false });
      }
    });
  }, [auth]);

  let provider = new firebase.auth.GithubAuthProvider();
  const addCard = async (card: string) => {
    return db.collection("card").add({
      description: card,
      user: user.displayName,
    });
  };
  const refecthData = () => {
    setRefecth(!refecth);
  };

  useEffect(() => {
    db.collection("card")
      .orderBy("user", "asc")
      .get()
      .then((snapshot: any) => {
        setcard(snapshot.docs.map((doc: any) => {
          const { description, user } = doc.data();
          return {
            id: doc.id.toString(),
            description,
            user,
          };
        }))
      });
  }, [refecth]);

  return {
    auth,
    provider,
    card,
    user,
    refecthData,
    addCard,
  };
};

const FirebaseContext = createContext<FirebaseContext>(
  {} as FirebaseContext
);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }: any) => {
  const state = InitialState();
  return (
    <FirebaseContext.Provider value={state}>
      {children}
    </FirebaseContext.Provider>
  );
};
