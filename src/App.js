import { useEffect, useState } from "react";
import "./App.css";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db, provider } from "./firebase-auth";
import { signInWithPopup } from "firebase/auth";

function App() {
  const [game, setGame] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");
  const gameCollectionRef = collection(db, "names");
  const createUser = async () => {
    await addDoc(userCollectionRef, { name: name, age: Number(age) });
  };
  const increaseAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { age: age + 1 });
  };
  const handleDelete = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  const handleGames = async () => {
    const gamedoc = doc(db, "games", "game1"); // Replace "game1" with the ID of your games document
    await updateDoc(gamedoc, {
      names: arrayUnion({ name: game }),
    });
  };
  const handleSignin = async () => {
    try {
      const newUser = await signInWithPopup(auth, provider);
      console.log(newUser);
      alert("Welcome!");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchUsers();
  });
  return (
    <>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={createUser}>Add User</button>
      {users.map((data) => {
        return (
          <div>
            <h1>{data.name}</h1>
            <h2>{data.age}</h2>
            <button
              onClick={() => {
                increaseAge(data.id, data.age);
              }}
            >
              Inc Age
            </button>
            <button
              onClick={() => {
                handleDelete(data.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <input
        type="text"
        placeholder="Add Game"
        onChange={(e) => setGame(e.target.value)}
      />
      <button onClick={handleGames}>Games Names</button>
      <button onClick={handleSignin}>GoogleSignIn</button>
    </>
  );
}

export default App;
