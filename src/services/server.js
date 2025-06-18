const BASE_URL = "https://jsonback.onrender.com/utilisateurs";
const BASE_URL1 = "https://jsonback.onrender.com/groupes";

// const BASE_URL = "http://localhost:3000/utilisateurs";
// const BASE_URL1 = "http://localhost:3000/groupes";



export async function getUserByPhone(numero) {
    numero = '%2B' + numero.slice(1);
  const res = await fetch(`${BASE_URL}?numero=${numero}`);
  const utilisateurs = await res.json();
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

export async function deleteUser(userId) {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    console.error("Erreur lors de la suppression");
    return false;
  }

  return true;
}


export async function deleteGrp(groupeId) {
  const res = await fetch(`${BASE_URL1}/${groupeId}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    console.error("Erreur lors de la suppression");
    return false;
  }

  return true;
}



export async function getGroupe() {
  const res = await fetch(BASE_URL1)
  return await res.json();
}




export async function createGroupe(user) {
  const res = await fetch(BASE_URL1, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!res.ok) return false;
  return await res.json();
}


export async function updateUser(user, idUser) {
  const res = await fetch(BASE_URL + `/${user.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!res.ok) return false;
  return await res.json();
}


export async function updateGroupe(groupes) {
  const res = await fetch(BASE_URL1 + `/${groupes.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(groupes)
  });

  if (!res.ok) return false;
  return await res.json();
}


export async function createMessage(user, idUser) {
  const res = await fetch(BASE_URL + `/${idUser}`, {
    method: "PATCH",
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
