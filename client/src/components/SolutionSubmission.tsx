// import React, { useState } from "react";
// import solutionChecker from "../utils/solutionChecker";
// import { Controlled as CodeMirror } from "react-codemirror2";
// import "codemirror/lib/codemirror.css";

// interface SolutionSubmissionProps {
//   challenge?: {
//     title: string;
//   };
// }

// const SolutionSubmission: React.FC<SolutionSubmissionProps> = ({
//   challenge,
// }) => {
//   const [userCode, setUserCode] = useState("");
//   const [isCorrect, setIsCorrect] = useState(false);

//   const handleSubmission = () => {
//     const expectedOutput = 0; /* Get the expected output for the challenge */
//     const isUserCodeCorrect = solutionChecker(userCode, expectedOutput);
//     setIsCorrect(isUserCodeCorrect);
//   };

//   return (
//     <div className="container mx-auto">
//       <h3 className="text-2xl font-semibold mb-4">Solution Submission</h3>
//       <CodeMirror
//         value={userCode}
//         options={{
//           mode: "javascript",
//           theme: "default",
//           lineNumbers: true,
//         }}
//         onBeforeChange={(_editor, _data, value) => {
//           setUserCode(value);
//         }}
//       />
//       <button
//         className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-4"
//         onClick={handleSubmission}
//       >
//         Submit Solution
//       </button>
//       {isCorrect ? (
//         <p>Your solution is correct!</p>
//       ) : (
//         <p>Your solution is incorrect.</p>
//       )}
//     </div>
//   );
// };

// export default SolutionSubmission;
import React from "react";

type SolutionSubmissionProps = {};

const SolutionSubmission: React.FC<SolutionSubmissionProps> = () => {
  return <div>Have a good coding</div>;
};
export default SolutionSubmission;
