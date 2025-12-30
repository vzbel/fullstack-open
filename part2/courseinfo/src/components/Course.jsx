const Header = (props) => <h2>{props.course}</h2>

const Content = ({ parts }) => (
  <div>
    {
      parts.map((part) => (
        <Part key={part.id} part={part}/>
      ))
    }
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = ({ course }) => {
  const calculateTotal = () => {
    return (
      course.parts.reduce((acc, part) => {
        return acc + part.exercises;
      }, 0)
    );
  }

  return (
    <article>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total total={calculateTotal()} />
    </article>
  );
};

export default Course;