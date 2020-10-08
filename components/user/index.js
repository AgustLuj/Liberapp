//const pagina = 'http://192.168.100.42/users/';
const pagina = 'http://192.168.100.42:3000';

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
    if(null !== data['err']){
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
  async changeUser(dni,name,usern,seg,segold,fn){
    console.log(dni,name,seg,usern)
    const querry = await fetch(`${pagina}/users/changeUser`,{
      method:'POST',
      body: JSON.stringify({dni,name,usern,seg,segold}),
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      }
    });
    const data = await querry.json();
    if(data['err'] === true){
      fn(true);
    }else{
      fn(false);
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
    if(data['err'] === true){
      fn(true);
    }else{
      fn(false);
    }   
  }
  async allnews(fn){
    const querry = await fetch(`${pagina}/news`,{
      method:'GET',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      }
    });
    const data = await querry.json();
    //console.log(data)
    fn(false,data)
  }
}
export default new User;