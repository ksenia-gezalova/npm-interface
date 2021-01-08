import toCamelCase from "@/utils/toCamelCase";

const findSubmodule = (fileName, moduleName, requireModule) => {
  return {
    moduleName: parseFileName(fileName.split(`./${moduleName}/`).join("")),
    module: {
      namespaced: true,
      ...requireModule(fileName).default,
    },
  };
};
const parseFileName = (fileName) => {
  return toCamelCase(fileName.split("/")[1].replace(/(\.\/|\.js)/g, ""));
};

export function registerModules(
  parseSubmodules = false,
  parentModuleName = ""
) {
  const requireModule = require.context(
    ".",
    true,
    /^(?!.*(actions|mutations|getters|index|\w-types|store.namespaces)).*\.js$/
  );
  const files = requireModule.keys();
  return files.reduce((modules, fileName) => {
    if (/\.spec\.js$/.test(fileName)) return modules;
    const parsedFileName = parseFileName(fileName);
    if (
      parentModuleName === parsedFileName &&
      parseSubmodules &&
      fileName.includes(`${parsedFileName}/modules`)
    ) {
      const subModule = findSubmodule(fileName, parsedFileName, requireModule);
      modules[subModule.moduleName] = subModule.module;
      return modules;
    }
    if (!parseSubmodules) {
      modules[parsedFileName] = {
        namespaced: true,
        ...requireModule(fileName).default,
      };
      return modules;
    }
    return modules;
  }, {});
}
