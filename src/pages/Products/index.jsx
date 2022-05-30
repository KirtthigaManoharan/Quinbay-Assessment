import React, { useState, useEffect } from "react";
import axios from "axios";

//Pages
import { Header } from "./Header";
import { ProductsCard } from "./ProductsCard";
const _ = require('lodash');

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
  const [flowType, setFlowType] = useState("Default");

  const handleInput = (e) => {
    setPageIndex(0);
    setSearchValue(e.target.value);
    setFlowType("Input Search");
  };

  const clearSearch = () => {
    setSearchValue("");
    setPageIndex(0);
    setFlowType("Input Search");
  };

  const handlePageClick = (event) => {
    setFlowType("Pagination")
    setPageIndex(event.selected);
  };

  const handlePopup = (data) => {
    setShowModal(true);
    setProductDetailedView(data?.uniqueSellingPoint);
  }

  const scrollHandler = () => {
    window.onscroll = function(ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setFlowType('Scroll');
        setPageIndex(pageIndex + 1)
      }
    };
  }

  useEffect(() => {
    fetchDataFromAPI();
  }, [searchValue, pageIndex]);

  useEffect(() => {
    window.addEventListener("scroll", _.throttle(scrollHandler, 1000));
  },[pageIndex])

  const fetchDataFromAPI = () => {
    if(flowType !== 'Scroll') {
      setLoading(true);
    }

    if( flowType === 'Pagination') {
      setProductData([]);
      for(let i=0; i<= pageIndex ; i++) {
      axios
        .get(
          `https://www.blibli.com/backend/search/products?searchTerm=${searchValue ? searchValue : null}&start=${i}&itemPerPage=24`
        )
        .then((res) => {
          if (res && res.status === 200) {
            let { data } = res.data;
            setTotalPageCount(data?.paging?.total_page);
            setProductData((prevState) => [...prevState, ...data?.products])
            setLoading(false);
          }
        })
        .catch((err) => {
          setDisplayErrorMsg(true);
          setLoading(false);
        });
      }
    } else {
      axios
      .get(
        `https://www.blibli.com/backend/search/products?searchTerm=${searchValue ? searchValue : null}&start=${pageIndex}&itemPerPage=24`
      )
      .then((res) => {
        if (res && res.status === 200) {
          let { data } = res?.data;
          setTotalPageCount(data?.paging?.total_page);

          if(flowType === 'Input Search') {
            setProductData(data?.products)
          } else if(flowType === 'Default') {
            setProductData(data?.products)
          } else if(flowType === 'Scroll') {
            setProductData((prevState) => [...prevState, ...data?.products])
          }

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
