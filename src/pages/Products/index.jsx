import React, { useState, useEffect } from "react";
import axios from "axios";

//Pages
import { Header } from "./Header";
import { ProductsCard } from "./ProductsCard";

//Assets
import "../../assets/scss/styles.scss";

//Components
import { Loader } from "../../components/Loader/Loader";

const Products = () => {
  const [searchValue, setSearchValue] = useState("samsung");
  const [productData, setProductData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productDetailedView, setProductDetailedView] = useState("");

  const handleInput = (e) => {
    setSearchValue(e.target.value);
    fetchDataFromAPI(pageIndex);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  const handlePageClick = (event) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageIndex(event.selected);
  };

  const handlePopup = (data) => {
    setShowModal(true);
    setProductDetailedView(data?.uniqueSellingPoint);
  }

  useEffect(() => {
    fetchDataFromAPI(pageIndex);
  }, [searchValue, pageIndex]);

  const fetchDataFromAPI = (pageNo) => {
    setLoading(true);
    if(searchValue !== "") {
      axios
        .get(
          `https://www.blibli.com/backend/search/products?searchTerm=${searchValue}&start=${pageNo}&itemPerPage=24`
        )
        .then((res) => {
          if (res && res.status === 200) {
            let { data } = res.data;
            setTotalPageCount(data?.paging?.total_page);
            setProductData(data?.products);
            setLoading(false);
          }
        })
        .catch((err) => {
          setDisplayErrorMsg(true);
          setLoading(false);
        });
    }
  };
  

  return (
    <div className="products-wrapper">
      {showModal && 
        <div id="open-modal" className="modal-window">
          <div>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <i className="fa fa-close"></i>
            </button>
            <h1 className='modal-title'>Product Details</h1>
            <p className='modal-description' dangerouslySetInnerHTML={ {__html: productDetailedView } }>
            </p>
          </div>
        </div>
      }

      <Header
        searchValue={searchValue}
        handleInput={handleInput}
        clearSearch={clearSearch}
      />
      {loading ? (
        <Loader />
      ) : (
        <ProductsCard
          productData={productData}
          pageIndex={pageIndex}
          displayErrorMsg={displayErrorMsg}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setDisplayErrorMsg={setDisplayErrorMsg}
          totalPageCount={totalPageCount}
          handlePageClick={handlePageClick}
          handlePopup={handlePopup}
        />
      )}
    </div>
  );
};

export default Products;
