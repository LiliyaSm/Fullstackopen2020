import React, { useState } from "react";
import ReactDOM from "react-dom";


const Header = (props) => {
    return <h1>{props.text}</h1>;
};

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
);

const Display = (props) => (
    <div>
        {props.text}
        {props.value}
    </div>
);

const App = () => {

    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            {" "}
            <Header text="Give feedback" />
            <Button handleClick={() => setGood(good + 1)} text="Good" />
            <Button
                handleClick={() => setNeutral(neutral + 1)}
                text="Neutral"
            />
            <Button handleClick={() => setBad(bad + 1)} text="Bad" />
            <Header text="Statistics" />
            <Display value={good} text="Good " />
            <Display value={neutral} text="Neutral " />
            <Display value={bad} text="Bad " />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
