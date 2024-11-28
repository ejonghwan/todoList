// test


export const getPosts = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
   const data = await res.json();

   return data;
};
export const fetchUsers = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
   const data = await res.json();

   return data;
};
export const fetchUserById = async (id: string) => {
   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
   const data = await res.json();

   return data;
};
