import React, { useState } from "react";

const Person = ({ person }) => {
    return (
        <div>
            {person.name} : {person.number}
        </div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const addName = (event) => {
        event.preventDefault();
        const nameObject = {
            name: newName,
            number: newNumber,
        };
        // "some" tests whether at least one element in the array passes the test implemented by the provided function
        if (persons.some((el) => el.name === nameObject.name)) {
            alert(`${nameObject.name} is already added to phonebook`);
        } else {
            setPersons(persons.concat(nameObject));
        }

        setNewName("");
        setNewNumber("");
    };

    const handleNewName = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };
    const handleNewNumber = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    number:
                    <input value={newNumber} onChange={handleNewNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map((person) => (
                    <Person key={person.name} person={person} />
                ))}
            </div>
        </div>
    );
};

export default App;
