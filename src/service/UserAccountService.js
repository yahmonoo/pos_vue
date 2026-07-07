import axios from "../config";

class UserAccountService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getUserAccount(userType='ALL') {
    let url = `/useraccount?userType=${userType}`;
    return axios.get(url).then((request) => request.data);
  }
  addUseraccount(useraccount) {
    let url = `/useraccount`;
    return this.axios.post(url, useraccount).then((request) => request.data);
  }
  updateUseraccount(useraccount) {
    let url = `/useraccount/${useraccount.userAccountId}`;
    return this.axios.put(url, useraccount).then((request) => request.data);
  }
  deleteUseraccount(useraccount) {
    let url = `/useraccount/${useraccount.userAccountId}`;
    return this.axios.delete(url).then((request) => request.data);
  }

  
}

const service = new UserAccountService();
export default service;
