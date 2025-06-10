const BASE_URL = "http://localhost:3000/utilisateurs";

export async function getUserByPhone(numero) {

    numero = '%2B' + numero.slice(1);
    console.log(numero);
  
  const res = await fetch(`${BASE_URL}?numero=${numero}`);
  // console.log(res);
  
  const utilisateurs = await res.json();
  // console.log(utilisateurs);

  return utilisateurs.length > 0 ? utilisateurs[0] : null;

  
}

export async function getUser() {
  const res = await fetch(BASE_URL)
  return await res.json();
}



export async function createUser(user) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!res.ok) return false;
  return await res.json();
}


// export async function createUser(numero) {
//   const newUser = {
//     numero,
//     username: `User-${numero.slice(-4)}`,
//     avatar: "https://via.placeholder.com/100"
//   };
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newUser)
//   });
//   return await res.json();
// }
