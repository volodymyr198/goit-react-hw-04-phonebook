import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import FormPhonebook from '../FormPhonebook/FormPhonebook';
import ContactList from '../ContactList';
import Filter from '../Filter';
import css from './App.module.css';

class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedcontacts = JSON.parse(contacts);

        if (parsedcontacts) {
            this.setState({ contacts: parsedcontacts });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem(
                'contacts',
                JSON.stringify(this.state.contacts)
            );
        }
    }

    addContactForm = ({ name, number }) => {
        if (
            this.state.contacts.find(
                contact => contact.name.toLowerCase() === name.toLowerCase()
            )
        ) {
            alert(`${name} is already in contacts`);
            return;
        }

        this.setState(prevState => {
            return {
                contacts: [
                    { id: nanoid(), name, number },
                    ...prevState.contacts,
                ],
            };
        });
    };

    deleteContact = idx => {
        this.setState(({ contacts }) => {
            const newContacts = contacts.filter((_, index) => index !== idx);
            return {
                contacts: newContacts,
            };
        });
    };

    changeFilter = e => {
        this.setState({ filter: e.currentTarget.value });
    };

    getVisibleContacts = () => {
        const { contacts, filter } = this.state;
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );
    };

    render() {
        const { filter } = this.state;
        const visibleContacts = this.getVisibleContacts();

        return (
            <div className={css.wrapper}>
                <h1 className={css.titlePhone}>Phonebook</h1>
                <FormPhonebook onSubmit={this.addContactForm} />
                <h2 className={css.titleCont}>Contacts</h2>
                <Filter value={filter} onChange={this.changeFilter} />
                <ContactList
                    contacts={visibleContacts}
                    onDelete={this.deleteContact}
                />
            </div>
        );
    }
}

export default App;
