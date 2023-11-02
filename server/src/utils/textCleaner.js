const cleanJestOutput = (output) => {
  // cleaning response to make fail text looks similar to pass text to easily manage on client
  const testSummary = output.match(/FAIL.*?(?=●)/gs);
  const testResults = output.match(
    /Test Suites:.*?(?=\s*Ran all test suites matching)/gs
  );

  let cleanedOutput = "";
  if (testSummary && testSummary[0]) {
    cleanedOutput += testSummary[0];
  }
  if (testResults && testResults[0]) {
    cleanedOutput += "\n" + testResults[0];
  }
  return cleanedOutput;
};

module.exports = { cleanJestOutput };
