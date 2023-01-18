export default class PostService {
  static async getAll() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
  }
}
