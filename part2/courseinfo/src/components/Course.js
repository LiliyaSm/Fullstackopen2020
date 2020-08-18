import React from "react";

const Header = ({ course }) => {
    return <h2>{course.name}</h2>;
};

const Total = ({ parts }) => {
    const sum = parts.reduce((acc, x) => acc + x.exercises, 0);
    return (
        <p>
            <strong>total of {sum} exercises</strong>{" "}
        </p>
    );
};

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};


export default Course