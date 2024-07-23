import { useEffect, useState } from "react";

export default function CheckIn({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("check in user");
    let timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return null;
  }

  return { ...children };
}
