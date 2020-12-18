import firebase from "firebase";
require("@firebase/firestore")
var firebaseConfig = {
    apiKey: "AIzaSyBSNmhH4KdGrk15szh73qq4W6RwfHOiLWg",
    authDomain: "hospitaladvisor-87d7e.firebaseapp.com",
    projectId: "hospitaladvisor-87d7e",
    storageBucket: "hospitaladvisor-87d7e.appspot.com",
    messagingSenderId: "683109745788",
    appId: "1:683109745788:web:a87e55989e07b839ff35f9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();