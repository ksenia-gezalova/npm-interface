import mutations from "./mutations";
import actions from "./actions";

export default {
  state: {
    packagesList: [],
    paginatedList: [],
    isLoading: true,
    detailedPackage: [],
  },
  actions,
  mutations,
};
