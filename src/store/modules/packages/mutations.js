export default {
  setList(state, payload) {
    state.packagesList = payload;
  },
  setPaginatedList(state, payload) {
    let filteredList = state.packagesList;

    if (payload.filterText) {
      filteredList = filteredList.filter(
        (item) => item.name.indexOf(payload.filterText) !== -1
      );
    }

    state.paginatedList = filteredList.slice(
      payload.itemsPerPage * (payload.page - 1),
      payload.itemsPerPage * payload.page
    );
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setDetailedPackage(state, payload) {
    state.detailedPackage = payload;
  },
};
