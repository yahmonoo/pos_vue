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
  updateSale(sale) {
    let url = `/sale/${sale.saleId}`;
    return this.axios.put(url, sale).then((request) => request.data);
  }
  deleteSale(sale) {
    let url = `/sale/${sale.saleId}`;
    return this.axios.delete(url).then((request) => request.data);
  }
  getSaleList(fromDate, toDate, status) {
    let url = `/sale?fromDate=${fromDate}&toDate=${toDate}&status=${status}`;
    return this.axios.get(url).then((request) => request.data);
  }
  
}

const service = new SaleService();
export default service;
