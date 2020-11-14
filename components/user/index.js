const pagina = 'https://adordni.ml';
//const pagina = 'http://192.168.100.42:3000';
class User{
  async getData(dni,seg,fn){
    let querry = await fetch(`${pagina}/users/ingresar`, {
        method: 'POST',
        body: JSON.stringify({dni,seg}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    
    const data = await querry.json();
    if(querry.status != 200){
      if(!data['user']){
        fn(false,false);
      }else{
        fn(false,null); 
      }
      
    }else{
      if(null !== data['user']){
        fn(true,data['user']);
      }else{
        fn(false,null);
      }
    }
    
  }
  
  async changeUser(name,usern,seg,segold,fn){
    let _id = global.value._id;
    const querry = await fetch(`${pagina}/users/changeUser`,{
      method:'POST',
      body: JSON.stringify({_id,name,usern,seg,segold}),
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      }
    });
    
    const data = await querry.json();
    if(querry.status != 200){
      fn(false);
    }else{
      fn(true);
    }
  }
  async checkPass(seg,fn){
    let _id = global.value._id;
    const querry = await fetch(`${pagina}/users/checkPass`,{
      method:'POST',
      body: JSON.stringify({_id,seg}),
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      }
    });
    const data = await querry.json();
    if(querry.status != 200){
      fn(false);
    }else{
      fn(true);
    } 
  }
  async search(dni,username,fn){
    let _id = global.value._id;
    const querry = await fetch(`${pagina}/users/search`,{
      method:'POST',
      body: JSON.stringify({dni,username,_id}),
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      }
    });
    const data = await querry.json();
    console.log(data);
    if(querry.status != 200){
      if(data['err'] != null){
        fn(false,data['err']);
      }
      if(data['err'] === true){
        fn(false,null);
      }
    }else{
      if(null != data['user']){
        fn(true,data['user']);
      }else{
        console.log(data,'a');
        fn(false,null);
      }
    }
  }
  async allnews(fn){
    const querry = await fetch(`${pagina}/news/allNews`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      }
    });
    const data = await querry.json();
    //console.log(data)
    if(querry.status != 200){
      fn(false);
    }else{
      fn(true,data)
    } 
    
  }
  async newsHome(fn){
    const querry = await fetch(`${pagina}/news/screenHome`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      }
    });
    const data = await querry.json();
    //console.log(data)
    if(querry.status != 200){
      fn(false);
    }else{
      fn(true,data)
    } 
    
  }
  async userVote(idV,fn){
    let _id = global.value._id;
    const querry = await fetch(`${pagina}/votes/userVote`,{
      method:'POST',
      body:JSON.stringify({_id,idV}),
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      }
    });
    const data = await querry.json();
    //console.log(data)
    if(querry.status != 200){
      fn(false);
    }else{
      fn(true,data)
    } 
    
  }
  async getDataNewUser(fn){
    let _id = global.value._id;
    let querry = await fetch(`${pagina}/newusers/data`, {
        method: 'POST',
        body: JSON.stringify({_id}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    
    const data = await querry.json();
    if(querry.status != 200){
      if(!data['NewUser']){
        fn(false,false);
      }else{
        fn(false,null); 
      }
      
    }else{
      if(null !== data['NewUser']){
        fn(true,data['NewUser']);
      }else{
        fn(false,null);
      }
    }
    
  }
  async acceptUser(userId,fn){
    let _id = global.value._id;
    let querry = await fetch(`${pagina}/newusers/acceptuser`, {
      method: 'POST',
      body: JSON.stringify({_id,userId}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await querry.json();
    if(querry.status != 200){
      if(data['err']){
        fn(true, false);
      }
    }else{
      if(data['user'] != null){
        fn(false,data['user']);
      }else{
        fn(true, null);
      }
      
    } 
  }
  async rejectUser(userId,fn){
    let _id = global.value._id;
    let querry = await fetch(`${pagina}/newusers/rejectUser`, {
      method: 'POST',
      body: JSON.stringify({_id,userId}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await querry.json();
    if(querry.status != 200){
      if(data['err']){
        fn(true, false);
      }
    }else{
      if(data['user']){
        fn(false,true);
      }else{
        fn(true, null);
      }
      
    } 
  }
}

export default new User;