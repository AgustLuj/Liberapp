//const pagina = 'http://192.168.100.42/users/';
const pagina = 'http://192.168.100.42:3000/users/';

class user{
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
        const querry = await fetch(`${pagina}/ingresar`, {
            method: 'POST',
            body: JSON.stringify({dni,seg}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          });
        
        const data = await querry.json();
        //console.log(data['user'].name);
        fn(data['user']);
    }
}
export default new user;