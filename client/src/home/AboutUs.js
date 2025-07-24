import "./aboutUs.css";

export default function AboutUs() {
  return (
    <div className="aboutUsSection">
      <h1 className="aboutUsHeader">About us</h1>
      <div className="aboutUsInfo">
        <img alt="aboutUs" src="aboutUs.png" className="aboutUsImg" />
        <p className="aboutUsText">
          At NDS, we believe every cup of coffee is an opportunity for delight.
          Our mission is to deliver carefully selected, freshly roasted coffee
          beans directly to your home. We are passionate about coffee and strive
          to share that experience with every customer, offering not just a
          product, but a ritual.
        </p>
      </div>
    </div>
  );
}
