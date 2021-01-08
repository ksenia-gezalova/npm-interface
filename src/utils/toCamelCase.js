export default function toCamelCase(str) {
  let solution;
  if (!str) {
    return "";
  } else {
    let replaced = str.replace(/-|_/g, " ").split(" ");
    solution = [replaced[0]];

    for (let i = 1; i < replaced.length; i++) {
      solution.push(
        replaced[i].substring(0, 1).toUpperCase() +
          replaced[i].substring(1).toLowerCase()
      );
    }
  }

  return solution.join("");
}
