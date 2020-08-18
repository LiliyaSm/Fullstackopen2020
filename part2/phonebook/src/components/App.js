import React, { useState } from "react";

const Person = ({ person }) => {
    return (
                <div>{person.name}</div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const addName = (event) => {
        event.preventDefault();
        const nameObject = {
            name: newName,
        };

        setPersons(persons.concat(nameObject));
        setNewName("");
    };

    const handleNewName = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>{persons.map((person)=> <Person key={person.name} person={person} />)}</div>
        </div>
    );
};

export default App;
