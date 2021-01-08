import axios from "axios";

const NPM_API = "https://registry.npmjs.org/";

const JSDELIVR_API = "https://data.jsdelivr.com/";

class packageService {
  constructor() {
    if (packageService.instance) {
      return packageService.instance;
    }

    packageService.instance = this;

    return this;
  }

  getPackages(period = "month") {
    return axios.get(`${JSDELIVR_API}v1/stats/packages/${period}`);
  }

  searchPackage({ text, size = "1", from = "0" }) {
    return axios.get(
      `${NPM_API}-/v1/search?text=${text}&size=${size}&from=${from}`
    );
  }
}

export default new packageService();
