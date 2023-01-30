import { PropTypes } from 'prop-types';
import css from './ContactList.module.css';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onDelete }) => {
    return (
        <ul className={css.contactList}>
            {contacts.map(({ id, name, number }, index) => (
                <ContactItem
                    key={id}
                    name={name}
                    number={number}
                    idx={index}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
    onDelete: PropTypes.func.isRequired,
};

export default ContactList;
