import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

export default function Loading(props) {
    const {isLoading} = useSelector(state => state.loadingReducer)
  return (
    <Fragment>
      {isLoading ? (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black"
          style={{ backgroundColor: "rgba(0,0,0,1)" }}
        >
          <img
            style={{ width: "100%" }}
            src="https://www.icegif.com/wp-content/uploads/loading-icegif.gif"
            alt="loading-gif"
          />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
