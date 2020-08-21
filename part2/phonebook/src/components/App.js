import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import numbersService from "../services/numbers";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    // empty array [] means that the effect is only run along with the first render of the component.
    useEffect(() => {
        console.log("effect");
        numbersService.getAll().then((response) => {
            setPersons(response);
        });
    }, []);

    console.log("render", persons.length, "notes");

    const personsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    const addName = (event) => {
        event.preventDefault();
        const nameObject = {
            name: newName,
            number: newNumber,
        };
        const newPerson = persons.find(
            (person) => person.name === nameObject.name
        );

        // check if entry already exists
        if (newPerson) {
            if (
                window.confirm(
                    `${nameObject.name} is already added to phonebook, replace the old number with a ner one?`
                )
            ) {
                numbersService.update(newPerson.id, nameObject).then(() => {
                    const copy = persons.map((person) => {
                        if (person.id === newPerson.id) {
                            person.number = nameObject.number;
                        }
                        return person;
                    });
                    setPersons(copy);
                    setNewName("");
                    setNewNumber("");
                });
            }
        } else {
            numbersService.create(nameObject).then((response) => {
                setPersons(persons.concat(response));
                setNewName("");
                setNewNumber("");
            });
        }
    };

    const handleDeleteNameof = (personId) => {
        const person = persons.find((person) => person.id === personId);
        if (window.confirm(`Do you really want to delete ${person.name}?`)) {
            numbersService.del(personId).then(() => {
                //  filter used to not modify the original array
                setPersons(persons.filter((person) => person.id !== personId));
            });
        }
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
            <Persons
                personsToShow={personsToShow}
                handleDeleteNameof={handleDeleteNameof}
            />
        </div>
    );
};

export default App;
