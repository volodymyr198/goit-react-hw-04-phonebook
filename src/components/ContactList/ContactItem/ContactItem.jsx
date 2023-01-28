import { PropTypes } from 'prop-types';
import css from './ContactItem.module.css';

const ContactItem = ({ idx, name, number, onDelete }) => {
    return (
        <li className={css.contactItem}>
            {name}: <span>{number}</span>
            <button onClick={() => onDelete(idx)} className={css.delBtn}>
                Delete
            </button>
        </li>
    );
};

ContactItem.propTypes = {
    idx: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ContactItem;
