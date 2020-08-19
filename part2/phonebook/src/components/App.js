import React, { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";


const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    const personsToShow =  persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

    const addName = (event) => {
        event.preventDefault();
        const nameObject = {
            name: newName,
            number: newNumber,
        };
        // "some" tests whether at least one element in the array passes the test implemented by the provided function
        if (persons.some((person) => person.name === nameObject.name)) {
            alert(`${nameObject.name} is already added to phonebook`);
        } else {
            setPersons(persons.concat(nameObject));
        }

        setNewName("");
        setNewNumber("");
    };

    const handleNewName = (event) => {
        setNewName(event.target.value);
    };
    const handleNewNumber = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilter={handleFilter} />
            <h2>Add a new</h2>
            <PersonForm
                addName={addName}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} />
        </div>
    );
};

export default App;
