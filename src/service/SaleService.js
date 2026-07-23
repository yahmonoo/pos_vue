import axios from "../config";

class SaleService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getSale() {
    let url = `/sale`;
    return axios.get(url).then((request) => request.data);
  }
  addSale(sale) {
    let url = `/sale`;
    return this.axios.post(url, sale).then((request) => request.data);
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

const service = new SaleService();
export default service;
