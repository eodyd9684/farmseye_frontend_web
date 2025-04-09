import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const SafetyData = () => {

  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await axios.get(
          '/V2/api/DSSP-IF-00247',
          {
            params: {
              serviceKey: 'R48UF0HJOIUF67UD', // 환경 변수에서 API 키 가져오기
              returnType: 'json',
              pageNo: 1,
              numOfRows: 10,
            },
          }
        );
        if (response.data?.header?.resultCode !== '00') {
          throw new Error(response.data.header.resultMsg || 'API Error');
        }

        setShelters(response.data.body || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(shelters);

  return (
    <div>
      <h1>Disaster Shelters</h1>
      <ul>
        {shelters.map((shelter, index) => (
          <li key={index}>
            <strong>{shelter.FCLT_NM}</strong>: {shelter.FCLT_ADDR_RONA}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SafetyData


