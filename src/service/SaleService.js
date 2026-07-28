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
    let url = `/city/${sale.saIdle}`;
    return this.axios.put(url, note).then((request) => request.data);
  }
  deleteSale(sale) {
    let url = `/sale/${sale.saleId}`;
    return this.axios.delete(url).then((request) => request.data);
  }
 getSaleList(fromDate,toDate,customerId) {
    let url = `/salelist`;
    return axios.get(url,{
      params:{
        fromDate,toDate,customerId
      }
    }).then((request) => request.data);
  }
  
}

const service = new SaleService();
export default service;
