import React, { useEffect, useState } from "react";

const Temp = () => {
  const [ready, isReady] = useState(false);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    console.log(1);
  }, [hover]);
  return (
    <div>
      <button onClick={() => setHover((prev) => !prev)}>Click Here</button>
    </div>
  );
};

export default Temp;
