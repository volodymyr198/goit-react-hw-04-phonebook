import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import FormPhonebook from '../FormPhonebook/FormPhonebook';
import ContactList from '../ContactList';
import Filter from '../Filter';
import css from './App.module.css';

const App = () => {
    const [contacts, setContacts] = useState(() => {
        return (
            JSON.parse(window.localStorage.getItem('contacts')) ?? [
                { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
                { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
                { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
                { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
            ]
        );
    });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const addContactForm = ({ name, number }) => {
        if (
            contacts.find(
                contact => contact.name.toLowerCase() === name.toLowerCase()
            )
        ) {
            alert(`${name} is already in contacts`);
            return;
        }

        setContacts(contacts => [{ id: nanoid(), name, number }, ...contacts]);
    };

    const deleteContact = idx => {
        setContacts(contacts.filter((_, index) => index !== idx));
    };

    const changeFilter = e => {
        setFilter(e.currentTarget.value);
    };

    const getVisibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );
    };

    return (
        <div className={css.wrapper}>
            <h1 className={css.titlePhone}>Phonebook</h1>
            <FormPhonebook onSubmit={addContactForm} />
            <h2 className={css.titleCont}>Contacts</h2>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
                contacts={getVisibleContacts()}
                onDelete={deleteContact}
            />
        </div>
    );
};

export default App;
