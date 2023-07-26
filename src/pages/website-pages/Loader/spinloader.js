import React from "react"
import "./loader.css"

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