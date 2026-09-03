import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../services/api";

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(slug);

        setProduct(data);

        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (error) {
        console.error(error);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleProceed = () => {
    if (!selectedPlan) {
      return;
    }

    setShowConfirmation(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>

        <h2>Product not found</h2>

        <p>
          We couldn't find the product you're looking for.
        </p>

        <button onClick={() => navigate("/")}>
          Back to Products
        </button>
      </div>
    );
  }

  const discount =
    selectedVariant &&
    Number(selectedVariant.mrp) > Number(selectedVariant.price)
      ? Math.round(
          ((Number(selectedVariant.mrp) -
            Number(selectedVariant.price)) /
            Number(selectedVariant.mrp)) *
            100
        )
      : 0;

  return (
    <div className="detail-page">

      {/* ================= HEADER ================= */}

      <header className="detail-navbar">

        <div
          className="detail-logo"
          onClick={() => navigate("/")}
        >
          <span>›</span> 1Fi
        </div>

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Products
        </button>

      </header>


      {/* ================= PRODUCT ================= */}

      <main className="product-detail-container">

        {/* LEFT SIDE */}

        <section className="product-gallery">

          {discount > 0 && (
            <div className="detail-discount">
              {discount}% OFF
            </div>
          )}

          <div className="large-product-image">

            <img
              src={product.image}
              alt={product.name}
            />

          </div>

          <div className="image-caption">
            <span>✓</span>
            Genuine product
          </div>

        </section>


        {/* RIGHT SIDE */}

        <section className="product-details">

          <div className="detail-category">
            PREMIUM SMARTPHONE
          </div>

          <h1>{product.name}</h1>

          <p className="detail-description">
            {product.description}
          </p>


          {/* ================= PRICE ================= */}

          {selectedVariant && (
            <div className="detail-price-section">

              <div className="detail-price">

                ₹
                {Number(
                  selectedVariant.price
                ).toLocaleString("en-IN")}

              </div>

              <div className="detail-mrp">

                ₹
                {Number(
                  selectedVariant.mrp
                ).toLocaleString("en-IN")}

              </div>

              {discount > 0 && (
                <div className="detail-save">
                  Save {discount}%
                </div>
              )}

            </div>
          )}


          {/* ================= VARIANTS ================= */}

          <div className="selection-section">

            <div className="selection-title">

              <h3>Choose your variant</h3>

              {selectedVariant && (
                <span>
                  {selectedVariant.storage} •{" "}
                  {selectedVariant.color}
                </span>
              )}

            </div>


            <div className="variant-grid">

              {product.variants.map((variant) => {

                const isSelected =
                  selectedVariant?.id === variant.id;

                return (
                  <button
                    key={variant.id}
                    className={`variant-card ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() =>
                      setSelectedVariant(variant)
                    }
                  >

                    <div className="variant-check">
                      {isSelected ? "✓" : ""}
                    </div>

                    <strong>
                      {variant.storage}
                    </strong>

                    <span>
                      {variant.color}
                    </span>

                    <small>
                      ₹
                      {Number(
                        variant.price
                      ).toLocaleString("en-IN")}
                    </small>

                  </button>
                );
              })}

            </div>

          </div>


          {/* ================= EMI PLANS ================= */}

          <div className="selection-section">

            <div className="emi-heading">

              <div>
                <h3>Choose your EMI plan</h3>

                <p>
                  Pick the plan that works best for you
                </p>
              </div>

              <span className="plan-count">
                {product.emi_plans.length} Plans
              </span>

            </div>


            <div className="emi-plans">

              {product.emi_plans.map((plan) => {

                const isSelected =
                  selectedPlan?.id === plan.id;

                return (
                  <button
                    key={plan.id}
                    className={`emi-plan ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() =>
                      setSelectedPlan(plan)
                    }
                  >

                    <div className="emi-top">

                      <div>

                        <span className="emi-label">
                          MONTHLY EMI
                        </span>

                        <strong className="emi-amount">
                          ₹
                          {Number(
                            plan.monthly_payment
                          ).toLocaleString("en-IN")}
                          <small>/month</small>
                        </strong>

                      </div>

                      <div className="radio">

                        {isSelected && (
                          <span>✓</span>
                        )}

                      </div>

                    </div>


                    <div className="emi-details">

                      <div>
                        <span>Tenure</span>
                        <strong>
                          {plan.tenure} months
                        </strong>
                      </div>

                      <div>
                        <span>Interest</span>
                        <strong>
                          {Number(
                            plan.interest_rate
                          ) === 0
                            ? "0% Interest"
                            : `${plan.interest_rate}%`}
                        </strong>
                      </div>

                      <div>
                        <span>Cashback</span>
                        <strong className="cashback">
                          ₹
                          {Number(
                            plan.cashback
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>

                    </div>

                    {Number(plan.interest_rate) === 0 && (
                      <div className="zero-interest">
                        ✨ Zero Interest EMI
                      </div>
                    )}

                  </button>
                );
              })}

            </div>

          </div>


          {/* ================= PROCEED ================= */}

          <div className="proceed-section">

            <button
              className={`proceed-button ${
                !selectedPlan ? "disabled" : ""
              }`}
              onClick={handleProceed}
              disabled={!selectedPlan}
            >

              {selectedPlan
                ? "Proceed with this plan"
                : "Select an EMI plan"}

              <span>→</span>

            </button>

            <p>
              🔒 Secure & transparent checkout
            </p>

          </div>

        </section>

      </main>


      {/* ================= CONFIRMATION MODAL ================= */}

      {showConfirmation && (

        <div className="modal-overlay">

          <div className="confirmation-modal">

            <button
              className="close-modal"
              onClick={() =>
                setShowConfirmation(false)
              }
            >
              ×
            </button>

            <div className="success-icon">
              ✓
            </div>

            <span className="modal-label">
              PLAN SELECTED
            </span>

            <h2>
              You're all set!
            </h2>

            <p>
              Here's your selected purchase plan.
            </p>


            <div className="summary">

              <div className="summary-product">

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div>
                  <strong>
                    {product.name}
                  </strong>

                  <span>
                    {selectedVariant.storage}
                    {" • "}
                    {selectedVariant.color}
                  </span>
                </div>

              </div>


              <div className="summary-row">

                <span>Product price</span>

                <strong>
                  ₹
                  {Number(
                    selectedVariant.price
                  ).toLocaleString("en-IN")}
                </strong>

              </div>


              <div className="summary-row">

                <span>Monthly EMI</span>

                <strong>
                  ₹
                  {Number(
                    selectedPlan.monthly_payment
                  ).toLocaleString("en-IN")}
                  /month
                </strong>

              </div>


              <div className="summary-row">

                <span>Tenure</span>

                <strong>
                  {selectedPlan.tenure} months
                </strong>

              </div>


              <div className="summary-row">

                <span>Interest</span>

                <strong>
                  {selectedPlan.interest_rate}%
                </strong>

              </div>


              <div className="summary-cashback">

                <span>🎁 Cashback</span>

                <strong>
                  ₹
                  {Number(
                    selectedPlan.cashback
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            </div>


            <button
              className="confirm-button"
              onClick={() =>
                setShowConfirmation(false)
              }
            >
              Confirm Selection ✓
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default ProductDetail;