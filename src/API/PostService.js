export default class PostService {
  static async getAll() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.json();
    } catch (e) {
      console.log(e);
    }
  }
}
