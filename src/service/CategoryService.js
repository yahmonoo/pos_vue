import axios from "../config";

class CategoryService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getCategory() {
    let url = `/category`;
    return axios.get(url).then((request) => request.data);
  }
  addCategory(category) {
    let url = `/category`;
    return this.axios.post(url, category).then((request) => request.data);
  }
  updateCategory(category) {
    let url = `/category/${category.categoryId}`;
    return this.axios.put(url, category).then((request) => request.data);
  }
  deleteCategory(category) {
    let url = `/category/${category.categoryId}`;
    return this.axios.delete(url).then((request) => request.data);
  }

  
}

const service = new CategoryService();
export default service;
