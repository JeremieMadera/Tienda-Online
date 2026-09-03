import I8 from "../../shared/components/I8/I8";
import "./TrustStrip.css";

const ITEMS = [
  { icon: "delivery",        title: "Fast Delivery",    desc: "Orders dispatched within 24 hours, delivered in 2–4 business days." },
  { icon: "diamond",         title: "Premium Quality",  desc: "Only the finest natural fabrics — linen, merino wool, organic cotton." },
  { icon: "return-purchase", title: "Free Returns",     desc: "30-day hassle-free returns on all full-price items." },
];

export default function TrustStrip() {
  return (
    <div className="trust">
      <div className="trust__grid">
        {ITEMS.map(({ icon, title, desc }) => (
          <div key={title} className="trust__item">
            <span className="trust__icon">
              <I8 name={icon} size={36} color="8C5F34" />
            </span>
            <div>
              <h3 className="trust__title">{title}</h3>
              <p className="trust__desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
