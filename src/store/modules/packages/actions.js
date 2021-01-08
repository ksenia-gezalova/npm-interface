import packageService from "@/services/packageService";

export default {
  getPackagesList(context, payload) {
    context.commit("setLoading", true);
    packageService
      .getPackages()
      .then((response) => {
        context.commit("setList", response.data);
        context.commit("setLoading", false);
        // api doesn't have possibility to request with limit and offser, so we need filter for pagination locally
        context.commit("setPaginatedList", payload);
      })
      .catch((error) => {
        context.commit("setLoading", false);
        throw error;
      });
  },

  async searchPackage(context, payload) {
    return await packageService
      .searchPackage(payload)
      .then((response) => {
        context.commit("setDetailedPackage", response.data.objects);
      })
      .catch((error) => {
        context.commit("setLoading", false);
        throw error;
      });
  },
};
