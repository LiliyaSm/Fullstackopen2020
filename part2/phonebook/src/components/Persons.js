import React from "react";


const Person = ({ person, handleDeleteName }) => {
    return (
        <div>
            {person.name} : {person.number}
            <button onClick={handleDeleteName}>Delete</button>
        </div>
    );
};

const Persons = ({ personsToShow, handleDeleteNameof }) => {
    return (
        <div>
            {personsToShow.map((person) => (
                <Person
                    key={person.name}
                    person={person}
                    handleDeleteName={()=>handleDeleteNameof(person.id)}
                />
            ))}
        </div>
    );
};


export default Persons;