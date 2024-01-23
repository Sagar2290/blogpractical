import conf from "../conf/conf";
import axios from "axios";

export class AuthService {
  ApiUrl;

  constructor() {
    this.ApiUrl = conf.APIUrl;
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await axios.post(
        this.ApiUrl + "auth/signup",
        JSON.stringify({ email, password, name }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // call another method
      return await this.login(userAccount.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const userAccount = await axios.post(
        this.ApiUrl + "auth/login",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return userAccount.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
