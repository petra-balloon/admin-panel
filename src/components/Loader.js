import React from "react"

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
    </>
  )
}

export default Loader;
