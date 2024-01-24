import conf from "../conf/conf";
import axios from "axios";

export class Service {
  ApiUrl;
  constructor() {
    this.ApiUrl = conf.APIUrl + "feed/";
  }

  async createPost({ title, slug, description, category }, token) {
    try {
      return await axios.post(
        this.ApiUrl + "post",
        JSON.stringify({ title, slug, description, category }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updatePost(id, { title, slug, description, category }, token) {
    try {
      return await axios.put(
        this.ApiUrl + "post/" + id,
        JSON.stringify({ title, slug, description, category }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deletePost(id, token) {
    try {
      return await axios.delete(this.ApiUrl + "post/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPosts(token) {
    try {
      return await axios.get(this.ApiUrl + "posts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const service = new Service();

export default service;
