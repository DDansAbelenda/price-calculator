import '../../css/fields.css'
import PropTypes from 'prop-types';


const Field = ({
    type,
    id = "",
    name,
    value,
    title,
    onChange,
    onBlur,
    placeholder = "",
    classNameInput = "",
    classNameLabel = "",
    required,
    readOnly = false

}) => {

    return (
        <div className="input-wrapper">
            <label className={classNameLabel}>{title}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={`field ${classNameInput}`}
                required={required}
                autoComplete="off"
                readOnly={readOnly}
            />
        </div>
    )
}

Field.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    classNameInput: PropTypes.string,
    classNameLabel: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    readOnly: PropTypes.bool
};

export default Field