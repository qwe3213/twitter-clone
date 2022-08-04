import { async } from "@firebase/util";
import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import AuthForm from "component/AuthForm";
import { signInWithPopup,getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword ,GoogleAuthProvider,GithubAuthProvider} from "firebase/auth";
const  Auth =()=> {
   
    
  
    
    const onSocialClick = async(event)=> {
        const {
            target: { name },
            } = event;
            let provider;
            if (name === "google") {
            provider = new GoogleAuthProvider();
            } else if (name === "github")  {
                provider = new GithubAuthProvider();
                }
            
            await signInWithPopup(authService, provider);
     
    }   
    return(
        <div>
      <AuthForm />
    <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
    </div>
    
</div>

    )
}
export default Auth