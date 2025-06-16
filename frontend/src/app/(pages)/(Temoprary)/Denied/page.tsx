import React from "react";

const Denied = () => {
  return (
    <div className="h-screen flex justify-center items-center p-4 bg-gradient-to-br from-dmc-black via-dmc-charcoal to-dmc-black">
      <div className="max-w-md text-center bg-dmc-white rounded-dmc-xl p-8 shadow-dmc-elegant">
        <div className="w-20 h-20 bg-dmc-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-dmc-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-dmc-primary text-dmc-gold font-bold mb-6">
          Access Denied
        </h1>
        
        <p className="text-dmc-body text-dmc-dark-gray mb-8 leading-relaxed">
          You do not have permission to view this page. Please contact an administrator if you believe this is an error.
        </p>
        
        <a href="/">
          <button className="btn-dmc-primary text-lg px-8 py-3 w-full">
            Return Home
          </button>
        </a>
        
        <div className="mt-6 pt-6 border-t border-dmc-silver">
          <p className="text-sm text-dmc-medium-gray">
            Need help? Contact us at{" "}
            <a href="mailto:vcu.dmc@gmail.com" className="text-dmc-gold hover:underline">
              vcu.dmc@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Denied;