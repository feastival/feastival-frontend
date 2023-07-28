import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function testing() {
  const [data, setData] = useState();
  const fetchData = async () => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await axios.get(`${api}/events`);
      setData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return <div>testing</div>;
}
