// Primary App component
import { Link, useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';

import { User } from '../types';

const Home = ({ user, guest }: { user: User; guest: boolean }) => {
  const navigate = useNavigate();

  const loginGuest = () => {
    sessionStorage.setItem('guest', 'true');
    navigate(0);
  };

  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10">
        <h1 className="w-[400px] text-green-500 text-5xl font-bold flex items-end md:justify-center mx-auto p-5">
          <img src="/tree.ico" alt="Tree" className="h-20" />
          <span className="text-center border-b-4 border-green-500 ">
            ENVS Matcher
          </span>
          <img src="/tree.ico" alt="Tree" className="h-20" />
        </h1>
        <p className="w-[400px] flex text-center justify-center mx-auto p-5 text-xl">
          Welcome to ENVS Matcher, a website geared towards helping both current
          and prospective ENVS students with finding a career in the field that
          matches their needs!
        </p>
        {!user.username && !guest ? (
          <>
            <p className="w-[400px] flex text-center justify-center mx-auto p-5 text-xl">
              To begin, choose one of the options below.
            </p>
            <div className="w-[400px] flex justify-center mx-auto p-5">
              <Link to={'/log-in'}>
                <button className="btn">Log In</button>
              </Link>
              <Link to={'/sign-up'}>
                <button className="btn">Sign Up</button>
              </Link>
              <button className="btn" onClick={() => loginGuest()}>
                Guest*
              </button>
            </div>
            <p className="w-[400px] flex text-center justify-center mx-auto p-5 text-sm italic">
              Please note that if you choose to proceed as a guest, your results
              won't be saved. If you wish to access your results at a later
              time, you will need to create an account.
            </p>
          </>
        ) : (
          <>
            <p className="w-[400px] flex text-center justify-center mx-auto p-5 text-xl">
              Fill out the questionnaire to get started with figuring out which
              careers might be a good fit for you!
            </p>
            <Link to="/questionnaire" className="flex justify-center">
              <button className="btn">
                Questionnaire{guest && <span>*</span>}
              </button>
            </Link>
            {guest && (
              <p className="w-[400px] flex text-center justify-center mx-auto p-5 text-sm italic">
                * Please note that as a guest, your results won't be saved. If
                you wish to access your results at a later time, you will need
                to create an account.
              </p>
            )}
          </>
        )}
        <p className="w-[400px] py-6 flex text-center justify-center mx-auto p-5 text-xl">
          <span className="py-6 border-t-2 border-green-500">
            This website is constantly being updated with new questions and
            jobs, so make sure to check in from time to time to see how your
            results may have changed.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
