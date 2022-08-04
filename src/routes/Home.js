import{collection,addDoc,getDocs,query,orderBy,onSnapshot} from "firebase/firestore"
import React,{useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {dbService, authService,storageService} from 'fbase.js';
import Nweets from "component/Nweet"
import { ref, uploadString ,getDownloadURL} from "@firebase/storage";
import NweetFactory from "component/NweetFactory";


const Home =({userObj})=> {
  console.log(userObj);
 
  const [nweets, setNweets] = useState([]);
  
    useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
     
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
      }));
     
      setNweets(nweetArr);
      });
      }, []);
   
  
    return( 
      <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
              {nweets.map((nweet=>
               <Nweets 
               key ={nweet.id}
                nweetObj ={nweet}
                  isOwner={nweet.creatorId=== userObj.uid}
               />
              
              ))}
            </div>
        </div>
        )
    
}

export default Home