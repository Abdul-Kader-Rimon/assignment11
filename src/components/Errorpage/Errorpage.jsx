 
import errorImg from "../../assets/error-404.png";
 
import { Link } from "react-router";
 
const ErrorPage = () => {
  return (
    <div>
 

      <div>
        <main className=" grid h-screen  place-items-center bg-gray-100 px-6 py-24 sm:py-32 lg:px-8 mb-5">
          <div className="text-center">
            <img className="mx-auto" src={errorImg} alt="" />
            <h1 className="mt-4 text-5xl  font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Oops, page not found!
            </h1>
            <p className="mt-4 text-gray-400 text-xl font-semibold">
              The page you are looking for is not available.
            </p>
            <Link to={"/"}>
              <button className="btn mt-6 btn-primary">Go Back!</button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ErrorPage;
