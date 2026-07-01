import axios from "../config";

class ProductService {
  axios;
  constructor() {
    this.axios = axios;
  }
getProductHome(type,categoryId) {
    let url = `/product/home`;
    return axios.get(url,{
      params:{
        type,categoryId
      }
    }).then((request) => request.data);
  }
  getProductDetail(productId) {
    let url = `/product/detail/${productId}`;
    return axios.get(url).then((request) => request.data);
  }


  
}

const service = new ProductService();
export default service;
