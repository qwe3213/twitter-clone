import{collection,addDoc,getDocs,query,orderBy,onSnapshot} from "firebase/firestore"
import React,{useEffect, useState} from "react";
import {dbService} from 'fbase.js';
import Nweets from "component/Nweet"

const Home =({userObj})=> {
  console.log(userObj);
  const [nweet, setNweet] = useState("");
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
   
    const onSubmit= async(event)=>{
      event.preventDefault()
      await addDoc(collection(dbService, "nweets"), {
        text :nweet,
        createdAt: Date.now(),
        creatorId:userObj.uid,
        });
        setNweet("");
        };
    const onChange=(event)=>{
      const {
        target :{value}
      } =event;
      setNweet(value)
    }
    
    return( 
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's  on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
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