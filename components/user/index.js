const pagina = 'https://adordni.ml';
//const pagina = 'http://192.168.100.42:3000';

class User{
  async online(fn){
    const querry = await fetch(pagina, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const data = await querry.json();
    fn(data.anda);
  }
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
  async changeUser(dni,name,usern,seg,segold,fn){
    const querry = await fetch(`${pagina}/users/changeUser`,{
      method:'POST',
      body: JSON.stringify({dni,name,usern,seg,segold}),
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
  async checkPass(dni,seg,fn){
    //console.log(dni,seg)
    const querry = await fetch(`${pagina}/users/checkPass`,{
      method:'POST',
      body: JSON.stringify({dni,seg}),
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
  async getOnlyData(dni,fn){
    let querry = await fetch(`${pagina}/users/getData`, {
      method: 'POST',
      body: JSON.stringify({dni}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const data = await querry.json();
    if(querry.status != 200){
      if(data['err'] === true){
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
  async userVote(idU,idV,fn){
    const querry = await fetch(`${pagina}/votes/userVote`,{
      method:'POST',
      body:JSON.stringify({idU,idV}),
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
}
export default new User;