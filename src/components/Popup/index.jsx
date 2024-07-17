import PropTypes from 'prop-types';
import "./popup.css";
import Button from '../Button';

const Popup = ({ message, closePopup }) => {
    return (
        <div className="popup-container show">
            <div className="popup-content">
                <h2>Resultado del Cálculo</h2>
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
    closePopup: PropTypes.func.isRequired
};

export default Popup