import { useNavigate } from 'react-router-dom';
import './styles.css';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <IoCheckmarkCircleOutline className="tick-icon" />
      <h2 className="success-title">Success!</h2>
      <p className="success-message">
        Thank you for submitting your request, <br />
        our support team will get in touch with you <br />
        to activate your profile
      </p>

      <button className="primary-button-signin" onClick={() => navigate('/')}>
        Sign In
      </button>

      <hr className="divider" />

      <div className="whatsapp-contact">
        <p className="whatsapp-title">
          Contact us on <FaWhatsapp className="whatsapp-icon" /> <span>WhatsApp</span>
        </p>
        <p className="whatsapp-subtext">
          Contact our Support team on WhatsApp to activate your profile
        </p>
      </div>
    </div>
  );
}
