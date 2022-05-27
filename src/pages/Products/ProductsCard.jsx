import React from "react";
import ReactPaginate from "react-paginate";
import SlickSlider from "../../components/Slick-Slider/Slider";
import { Error } from "../../components/ErrorComponent/Error";

export const ProductsCard = ({
  productData,
  displayErrorMsg,
  searchValue,
  setSearchValue,
  setDisplayErrorMsg,
  totalPageCount,
  pageIndex,
  handlePageClick,
  handlePopup
}) => {
  const itemsPerPage = 24;

  return (
    <div className="products-card-wrapper">
      {!displayErrorMsg ? (
        productData && (
          <>
          {searchValue !== "" &&
            <p className='search-items-found'>{itemsPerPage} Items found for <b>{searchValue}</b> in Page {pageIndex + 1}</p>
          }
            <ul className="products-display-container">
              {productData.map((data, index) => {
                return data.status === "AVAILABLE" &&
                 (
                  <li className="display-card" key={index}>
                    <div className="display-card-picture-album-container">
                      <SlickSlider sliderImages={data?.images} />
                    </div>

                    <div className="product-card-description">
                      <div className="display-card-content-container">
                        <h1 className="product-title">{data?.name}</h1>
                        <h6 className="product-final-price">
                          {data?.price?.priceDisplay}
                        </h6>
                        <h6 className="product-price-comparison">
                          <span className="product-retail-price">
                            {data?.price?.strikeThroughPriceDisplay}
                          </span>
                          {data.price.discount !== 0 && (
                            <span className="product-discount-percent">
                              {data?.price?.discount}%
                            </span>
                          )}
                        </h6>

                        <div className="merchant-information">
                          {data.badge.merchantBadgeUrl !== "None" && (
                            <img
                              src={data?.badge?.merchantBadgeUrl}
                              alt={data?.badge?.merchantBadge}
                              width="20"
                              height="20"
                            />
                          )}
                          <span className="merchant-data">
                            {data?.location}
                          </span>
                        </div>

                        {data.review.absoluteRating !== 0 && (
                          <div className="user-ratings-information">
                            <div className="rating-container">
                              <i className="fa fa-star"></i>
                              <span className="user-rating">
                                {data?.review?.absoluteRating}
                              </span>
                            </div>
                            <span className="rating-count">
                              ({data?.review?.count})
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="add-product-to-cart">
                        <button className="add-product-to-cart-btn" onClick={() => handlePopup(data)}>
                          See Details
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={`pagination-container`}>
              <ReactPaginate
                breakLabel="..."
                nextLabel={<i className="fa fa-chevron-right"></i>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={3}
                pageCount={totalPageCount}
                previousLabel={<i className="fa fa-chevron-left"></i>}
                renderOnZeroPageCount={null}
                forcePage={pageIndex}
              />
            </div>
          </>
        )
      ) : (
        <Error
          setSearchValue={setSearchValue}
          setDisplayErrorMsg={setDisplayErrorMsg}
        />
      )}
    </div>
  );
};
