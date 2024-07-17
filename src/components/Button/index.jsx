import PropTypes from 'prop-types';
import "./button.css"

const Button = ({children, type="", onClick}) => {
  return (
    <button type={type} onClick={onClick} >
        {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Button