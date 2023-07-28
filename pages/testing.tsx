import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import PrivateLayout from '@/components/Auth/PrivateLayout';

export default function testing() {
  const [data, setData] = useState<any>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <PrivateLayout>
      <div className="mt-44">
        {data.map((data: any) => (
          <div key={data.id}>
            <h2>name: {data.name}</h2>
            <h2>description: {data.description}</h2>
          </div>
        ))}
      </div>
    </PrivateLayout>
  );
}
