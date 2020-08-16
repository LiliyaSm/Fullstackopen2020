import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
    return <h1>{props.text}</h1>;
};

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
);

const Average = (props) => {
    let average = (props.good * 1 - props.bad * 1) / props.all;

    if (isNaN(average)) {
        average = 0;
    }
    return <div>average {average} </div>;
};

const Positive = (props) => {
    let positive = (100 * props.good) / props.all;
    if (isNaN(positive)) {
        positive = 0;
    }
    return <div>positive {positive} %</div>;
};

const Statistics = (props) => {
    let all = props.good + props.neutral + props.bad;
    return (
        <div>
            <div>good {props.good}</div>
            <div>neutral {props.neutral}</div>
            <div>bad {props.bad}</div>
            <div>all {all}</div>
            <Average good={props.good} bad={props.bad} all={all} />
            <Positive good={props.good} all={all} />
        </div>
    );
};

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            {" "}
            <Header text="Give feedback" />
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button
                handleClick={() => setNeutral(neutral + 1)}
                text="neutral"
            />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <Header text="Statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
