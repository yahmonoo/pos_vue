import axios from "../config";

class TownshipService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getTownship() {
    let url = `/township`;
    return axios.get(url).then((request) => request.data);
  }
  addTownship(township) {
    let url = `/township`;
    return this.axios.post(url, township).then((request) => request.data);
  }
  updateTownship(township) {
    let url = `/township/${township.townshipId}`;
    return this.axios.put(url, township).then((request) => request.data);
  }
  deleteCity(township) {
    let url = `/township/${township.townshipId}`;
    return this.axios.delete(url).then((request) => request.data);
  }

  
}

const service = new TownshipService();
export default service;
