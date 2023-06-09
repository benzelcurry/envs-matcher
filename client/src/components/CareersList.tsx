// Careers List page component
// Displays a list of all careers that are on website
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Sidebar from './Sidebar';
import { Career } from '../types';

const CareersList = () => {
  const [careers, setCareers] = useState<Career[]>();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/careers` || '/api/careers')
      .then((response) => {
        setCareers(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10 p-10">
        <h1 className="text-3xl text-center md:text-start">
          <span className="pb-2">
            Click on a career below to learn more about it!
          </span>
        </h1>
        <ul className="list-disc mt-10 ml-4 marker:text-green-500">
          {careers?.map((career) => (
            <Link to={`/careers/${career.title}`} key={uuidv4()}>
              <li aria-label="Click to view more details" className="p-4">
                <span className="border-b-2 border-green-500 text-2xl text-green-500 hover:text-green-300 hover:border-green-300 cursor-pointer">
                  {career.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CareersList;
