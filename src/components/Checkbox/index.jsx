import '../../css/fields.css'
import PropTypes from 'prop-types';


const Checkbox = ({
    id = "",
    name,
    title,
    onChange,
    required=false,
    checked,

}) => {

    return (
        <div className="input-wrapper checkbox">
            <input
                type="checkbox"
                id={id}
                name={name}
                onChange={onChange}
                className={`field`}
                required={required}
                autoComplete="off"
                checked={checked}
            />
            <label className='checkbox'>{title}</label>
        </div>
    )
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    checked: PropTypes.bool
};

export default Checkbox