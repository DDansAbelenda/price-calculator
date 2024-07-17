import PropTypes from 'prop-types';
import "./popup.css";
import Button from '../Button';

const Popup = ({ message, type = "", closePopup }) => {
    let title;
    if (type === "error") {
        title = "Error"
    } else {
        title = "Notificación"
    }
    return (
        <div className="popup-container show">
            <div className={`popup-content ${type}`}>
                <h2>{title}</h2>
                <p>
                    {message}
                </p>
                <Button onClick={closePopup}>Cerrar</Button>
            </div>
        </div>
    )
}
// Add props validation
Popup.propTypes = {
    message: PropTypes.string.isRequired,
    closePopup: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};

export default Popup