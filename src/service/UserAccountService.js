import axios from "../config";

class UserAccountService {
  axios;
  constructor() {
    this.axios = axios;
  }

 
  getUserAccount(userType='ALL') {
    let url = `/useraccount?userType=${userType}`;
    return this.axios.get(url).then((request) => request.data);
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

  // GET method အမှန်ဖြစ်ပြီး parameter များကို စနစ်တကျ ပို့ထားပါသည်
  getLogin(userName, password) {
    let url = `/useraccount/login`;
    return this.axios.get(url, {
      params: {
        userName: userName,
        password: password
      }
    }).then((request) => request.data);
  }

  // global axios အစား this.axios သို့ ပြောင်းလဲထားပါသည်
  updateUserPhoto(formData, userAccountId) {
    let url = `userAccount/${userAccountId}/photo`;
    return this.axios
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((request) => request.data);
  }
  getUserAccountById(userAccountId){
    let url=`/useraccount/${userAccountId}`;
    return this.axios.get(url).then((request) => request.data);
  }
}

const service = new UserAccountService();
export default service;