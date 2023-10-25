import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut  } from "firebase/auth";
import { getDatabase,ref,set,onValue,push,remove } from "firebase/database";
import { app } from "./firebaseconfig";


let auth = getAuth(app)
let db = getDatabase(app)


export let fbLogin=(body:any)=>{
    return new Promise((resolve,reject)=>{
        if(!body.email || !body.password){
            reject("Email and Password is Required")
        }else{
            signInWithEmailAndPassword(auth,body.email,body.password).then(res=>{
                let id = res.user.uid

                const referece = ref(db,`users/${id}`)

                onValue(referece,(data)=>{
                    if(data.exists()){
                        resolve(data.val())
                    }else{
                        reject("No Data Found")
                    }
                } )

            }).catch(err=>{
                reject(err)
            })
        }
    })
}

export let fbSignUp=(body:any)=>{
    return new Promise((resolve,reject)=>{
        if(!body.email || !body.password){
            reject("Email and Password is Required")
        }else{
            createUserWithEmailAndPassword(auth,body.email,body.password).then((res:any)=>{
                let id = res.user.uid

                body.id = id
                const referece = ref(db,`users/${id}`)
                set(referece,body).then((user:any)=>{
                    console.log(user)
                    resolve("User Created Successfully")
                }).catch(error=>{
                    reject(error)
                })

            }).catch((err:any)=>{
                reject(err)
            })
        }
    })


}
export let fbAuth=()=>{
   return new Promise((resolve,reject)=>{
       onAuthStateChanged(auth, (user) => {
           if (user) {
             // User is signed in, see docs for a list of available properties
             // https://firebase.google.com/docs/reference/js/auth.user
             const uid = user.uid;
             resolve(uid)
             // ...
           } else {
            reject("No User is Logged in")
             // User is signed out
             // ...
           }
         });
   })
}
export let fbAdd=(nodeName:string,body:any,id?:string)=>{
    console.log(id)
    return new Promise((resolve,reject)=>{
        const id = push(ref(db,`${nodeName}/`)).key        
        body.id = id
        const referece = ref(db,`${nodeName}/${body.id}`)

        set(referece,body).then((res:any)=>{
            console.log(res)
      
            resolve("Data Send Successfully")
          
        }).catch(err=>{
            reject(err)        
        })
    })
}
  
export let fbGet=(nodeName:string,id?:any)=>{
    return new Promise((resolve,reject)=>{
        const referece = ref(db,`${nodeName}/${id?id:""}`)
        onValue(referece,(data)=>{
            if(data.exists()){
                resolve(Object.values(data.val()))
            }else{
                reject("No Data Found")
            }
        })
    })
}



// firebaseUtils.js


export const fbGetp = (nodeName:any, bloodGroup:any) => {
  return new Promise((resolve, reject) => {
    const reference = ref(db, nodeName);
    
    onValue(reference, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Filter data based on blood group
        const filteredData = Object.values(data).filter((user:any) => user.Bloodgroup === bloodGroup);
        resolve(filteredData);
      } else {
        reject("No Data Found");
      }
    });
  });
};



export let fbDelete = (nodeName: string, id: string) => {
    return new Promise((resolve, reject) => {
        const reference = ref(db, `${nodeName}/${id}`);

        remove(reference)
            .then(() => {
                resolve("Data Deleted Successfully");
            })
            .catch((err) => {
                reject(err);
            });
    });
};
// In your firebasemethods file
export const getLastDonationDate = async (userId: string): Promise<Date | null> => {
    // Implement the logic to retrieve the last donation date from your database
    // You may use Firebase or any other database here
    // Replace the following with your actual database call
    try {
      const response = await fetch(`/api/getLastDonationDate?userId=${userId}`);
      const data = await response.json();
  
      if (data && data.lastDonationDate) {
        return new Date(data.lastDonationDate);
      }
  
      return null;
    } catch (error) {
      console.error("Error fetching last donation date:", error);
      return null;
    }
  };
  

export let fbEdit=()=>{}
export let fbGetById=()=>{}
export let fbLogout=()=>{
    return signOut(auth)      
}