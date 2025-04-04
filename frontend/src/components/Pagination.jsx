import React from "react";

function Pagination({pageNo, setPageNo, lastPage}) {

  const previousPage  = () => {
    setPageNo(pageNo - 1)
  }
  const nextPage  = () => {
    setPageNo(pageNo + 1)
  }
  return( 
  <div className="pageNo-tray">
        <button  
        className={pageNo===1?"btn btn-pageNo-inactive":"btn btn-pageNo-active"}
        onClick={previousPage}
        disabled={pageNo===1?true:false} >
          {'<'}
        </button>
        <span  className="btn btn-pageNo-active">
          {pageNo}
        </span>
        <button  
        className={pageNo===lastPage?"btn btn-pageNo-inactive":"btn btn-pageNo-active"}
        onClick={nextPage}
        disabled={pageNo===lastPage?true:false}>
        {'>'}
        </button>
        </div>)
}

export default Pagination;
