// Unused import to trigger dead code warning
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

// No interface/type definitions for props
export default function badcomponent(props) {
  // Multiple state declarations that could be combined
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [count, setCount] = useState(0);

  // Unsafe any type
  let unsafeVariable: any = null;

  // Memory leak - no cleanup in useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Memory leak waiting to happen");
    }, 1000);
  }, []);

  // Duplicate code block
  const handleClick1 = () => {
    if (data) {
      const result = data.map((item) => item.id * 2);
      console.log(result);
    }
  };

  const handleClick2 = () => {
    if (data) {
      const result = data.map((item) => item.id * 2);
      console.log(result);
    }
  };

  // Cognitive complexity - nested conditions
  const complexFunction = () => {
    if (data) {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].type === "special") {
            while (data[i].count > 0) {
              if (data[i].status === "active") {
                console.log("Found it!");
              }
            }
          }
        }
      }
    }
  };

  // Security hotspot - hardcoded credentials
  const API_KEY = "abc123secretkey";
  const PASSWORD = "admin123";

  // Unsafe innerHTML usage
  const renderHTML = () => {
    return { __html: props.content };
  };

  // Multiple issues: no error handling, potential memory leak, unsafe fetch
  useEffect(() => {
    fetch("http://api.example.com/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Empty catch block
  try {
    JSON.parse("{invalid json}");
  } catch (e) {
    // Silent catch - bad practice
  }

  // Magic numbers
  const calculateTotal = (quantity) => {
    return quantity * 1.08 * 1.15 + 4.99;
  };

  return (
    <div style={{ backgroundColor: "#ff0000", padding: "20px" }}>
      {" "}
      {/* Inline styles */}
      {/* Accessibility issues - no aria labels */}
      <img src="image.jpg" />
      <button onClick={() => setCount(count + 1)}>Click me</button>
      {/* Dangerous HTML rendering */}
      <div dangerouslySetInnerHTML={renderHTML()} />
      {/* Debug code left in */}
      {console.log("Component rendered")}
      {/* Accessibility issue - non-semantic HTML */}
      <div onClick={() => alert("clicked")} style={{ cursor: "pointer" }}>
        Click this text
      </div>
      {/* Duplicate IDs - HTML validity issue */}
      <div id="duplicate">Content 1</div>
      <div id="duplicate">Content 2</div>
      {unsafeVariable && <div>{unsafeVariable}</div>}
    </div>
  );
}
