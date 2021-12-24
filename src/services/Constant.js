export function getToken(){
    return new Promise(async (resolve,reject)=>{
        try {
            let token = await localStorage.getItem('token')
            if(token !== null){
                resolve({token: token})
            }else{
                reject({token: null})
            }
        } catch (error) {
            reject({token: null})            
        }
       
    })
}