import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = (props) => {
    return <h1>{props.text}</h1>;
};

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
);

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text} </td>
            <td>{props.value}</td>
        </tr>
    );
};

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad;
    let positive = (100 * props.good) / all;
    let average = (props.good * 1 - props.bad * 1) / all;

    if (isNaN(positive)) {
        positive = 0;
    }

    if (isNaN(average)) {
        average = 0;
    }

    if (all) {
        return (
            <table>
                <tbody>
                    <Statistic text="good" value={props.good} />
                    <Statistic text="neutral" value={props.neutral} />
                    <Statistic text="bad" value={props.bad} />
                    <Statistic text="all" value={all} />
                    <Statistic text="positive" value={positive + " %"} />
                    <Statistic text="average" value={average} />
                </tbody>
            </table>
        );
    } else {
        return <div>No feedback given</div>;
    }
};

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
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
