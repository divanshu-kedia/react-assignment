import axios from "axios";

const fetchUserList = () => {
  return new Promise((resolve, reject) => {
    //dummy json doesn't provide a single API for both search and pagination so fetching all data
    axios({
      baseURL: "https://dummyjson.com/",
      method: "GET",
      url: "users?limit=100",
      responseType: "application/json",
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default fetchUserList;
