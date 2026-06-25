import axios from "../config";

class TownshipService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getCity() {
    let url = `/city`;
    return axios.get(url).then((request) => request.data);
  }
  addCity(city) {
    let url = `/city`;
    return this.axios.post(url, city).then((request) => request.data);
  }
  updateCity(city) {
    let url = `/city/${city.cityId}`;
    return this.axios.put(url, note).then((request) => request.data);
  }
  deleteCity(city) {
    let url = `/city/${city.cityId}`;
    return this.axios.delete(url).then((request) => request.data);
  }

  
}

const service = new TownshipService();
export default service;
