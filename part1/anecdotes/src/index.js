import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
);

const Best = ({ vote, anecdotes }) => {
    //get index of the anecdote with the largest number of votes
    const indexOfMaxValue = vote.indexOf(Math.max(...vote));
    return (
        <div>
            <div>{anecdotes[indexOfMaxValue]}</div>
            <div>has {vote[indexOfMaxValue]} votes </div>
        </div>
    );
};

const App = (props) => {
    const [selected, setSelected] = useState(props.anecdotes[0]);
    // state of the current anecdote index
    const [index, setIndex] = useState(0);

    
    // create array for storing votes and fill with ziros
    const points = new Array(anecdotes.length).fill(0);
    const [vote, setVote] = useState(points);

    const handleNext = () => {
        //get random anecdote
        const anecdote =
            props.anecdotes[Math.floor(Math.random() * anecdotes.length)];

        // get index of random anecdote
        const i = props.anecdotes.indexOf(anecdote);

        setSelected(anecdote);
        setIndex(i);
    };

    const handleVote = () => {
        const copy = [...vote];
        copy[index] += 1;
        setVote(copy);
    };

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>{selected}</div>
            <div>has {vote[index]} votes </div>
            <br />
            <div>
                <Button handleClick={handleVote} text="vote" />
                <Button handleClick={handleNext} text="next anecdote" />
            </div>
            <h1>Anecdote with the most votes</h1>
            <Best vote={vote} anecdotes={props.anecdotes} />
        </div>
    );
};

const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
