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
getProduct(){
   let url = `/product`;
    return axios.get(url).then((request) => request.data);
}
addProduct(product){
   let url = `/product`;
   return this.axios.post(url, product).then((request) => request.data);
}
  
updateProduct(product) {
    let url = `/product/${product.productId}`;
    return this.axios.put(url, product).then((request) => request.data);
  }

deleteProduct(product) {
    let url = `/product/${product.productId}`;
    return this.axios.delete(url,product).then((request) => request.data);
  }

}


const service = new ProductService();
export default service;
