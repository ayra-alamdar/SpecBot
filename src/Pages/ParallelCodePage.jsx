import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./ParallelCodePage.css";
import { FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const complexityColors = {
  1: "complexity-1",
  2: "complexity-2",
  3: "complexity-3",
  4: "complexity-4",
  5: "complexity-5",
};

const ParallelCodePage = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const parallelizedCode = location.state?.parallelizedCode || "{}";
  const initialCodeInput = location.state?.codeInput || "{}";

  let extractedData = {};
  try {
    extractedData = JSON.parse(parallelizedCode);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  const [codeInput, setCodeInput] = useState(initialCodeInput);
  const [sortByDifference, setSortByDifference] = useState(false);
  const [filter, setFilter] = useState("all");
  const [loops, setLoops] = useState(Object.values(extractedData));

  useEffect(() => {
    // console.log("Updated codeInput:", codeInput);
  }, [codeInput]);

  if (sortByDifference) {
    loops.sort((a, b) => {
      const diffA = Math.abs(
        (a.Parallelized_Loop?.length || 0) - (a.Tiled_Loop?.length || 0)
      );
      const diffB = Math.abs(
        (b.Parallelized_Loop?.length || 0) - (b.Tiled_Loop?.length || 0)
      );
      return diffB - diffA;
    });
  }

  const replaceLoop = (loopObj) => {
    setCodeInput((prevCode) => {
      const originalLoop = loopObj.Loop;
      const parallelizedLoop = loopObj.Parallelized_Loop;

      if (parallelizedLoop === "Not Parallelized") {
        Swal.fire({
          title: "No Parallel Version!",
          text: "This loop doesn't have a parallelized version",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return prevCode;
      }

      const normalize = (code) =>
        code
          .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "") // Remove comments
          .replace(/([{}();=<>+\-*/%&|\[\]])/g, " $1 ") // Add spaces around symbols
          .replace(/\s+/g, " ") // Remove extra spaces
          .trim();

      const createPattern = (str) => {
        return normalize(str)
          .split(" ")
          .filter((s) => s)
          .map((s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
          .join("\\s*"); // Create a regex pattern with flexible spaces
      };

      const checkRegex = new RegExp(createPattern(originalLoop), "g");

      if (checkRegex.test(normalize(prevCode))) {
        // console.log("✅ Original Loop Found in Code");

        const newCode = prevCode.replace(checkRegex, (match) => {
          // console.log(
          //   "🔄 Replacing:\n",
          //   match,
          //   "\n➡️ With:\n",
          //   parallelizedLoop
          // );
          return parallelizedLoop; // Replace with parallelized loop
        });

        Swal.fire({
          title: "Loop Replaced!",
          text: "Parallelized version inserted successfully 🎉",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Remove the loop from the list after replacement
        setLoops((prevLoops) => prevLoops.filter((loop) => loop !== loopObj));

        // save the new code to session storage
        sessionStorage["ParallelCode"] = newCode;

        return newCode;
      }

      Swal.fire({
        title: "Loop Not Found!",
        text: "Original loop not found in current code",
        icon: "error",
        confirmButtonText: "OK",
      });

      return prevCode;
    });
  };

  return (
    <div className="page-container-pcode">
      <Navbar user={user} />
      <div className="filter-section">
        <h2>Filters</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Show All</option>
          <option value="parallelized">Parallelized Only</option>
          <option value="tiled">Tiled Only</option>
        </select>
        <button onClick={() => setSortByDifference(!sortByDifference)}>
          {sortByDifference ? "Reset Sorting" : "Sort by Difference"}
        </button>
        <button
          className="analytics-btn"
          onClick={() => navigate("/analytics")}
        >
          Get Insights
        </button>
      </div>

      <div className="content-container">
        <div className="loop-section">
          {loops.map((loop, index) => {
            if (
              (filter === "parallelized" &&
                loop.Parallelized_Loop === "Not Parallelized") ||
              (filter === "tiled" && loop.Tiled_Loop === "Not Tiled")
            )
              return null;

            return (
              <div key={index} className="loop-card">
                <div className="loop-header">
                  <h2>Loop {index + 1}</h2>
                  <div
                    className={`complexity-badge ${complexityColors[loop.Complexity_Class]}`}
                  >
                    <h3>Complexity Class: {loop.Complexity_Class}</h3>
                  </div>
                </div>
                <div className="loop-content">
                  <div className="code-section original">
                    <h3>Original Loop</h3>
                    <SyntaxHighlighter language="cpp" style={vscDarkPlus}>
                      {loop.Loop}
                    </SyntaxHighlighter>
                  </div>
                  {loop.Parallelized_Loop !== "Not Parallelized" && (
                    <div className="code-section parallelized">
                      <h3>Parallelized Loop</h3>
                      <SyntaxHighlighter language="cpp" style={vscDarkPlus}>
                        {loop.Parallelized_Loop}
                      </SyntaxHighlighter>
                    </div>
                  )}
                  {loop.Tiled_Loop !== "Not Tiled" && (
                    <div className="code-section tiled">
                      <h3>Tiled Loop</h3>
                      <SyntaxHighlighter language="cpp" style={vscDarkPlus}>
                        {loop.Tiled_Loop}
                      </SyntaxHighlighter>
                    </div>
                  )}

                  <button
                    className="configure-btn"
                    onClick={() => replaceLoop(loop)}
                  >
                    Configure <FaArrowRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="completed-code-section">
          <h2> Serial Code</h2>
          <SyntaxHighlighter language="cpp" style={vscDarkPlus}>
            {codeInput}
          </SyntaxHighlighter>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ParallelCodePage;
