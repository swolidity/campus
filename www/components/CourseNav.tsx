import Link from "next/link";

export default function CourseNav({ courseID }) {
  return (
    <div className="course-header">
      <ul>
        <li>
          <Link href="/courses/[id]" as={`/courses/${courseID}`}>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/courses/[id]" as={`/courses/${courseID}`}>
            <a>Content</a>
          </Link>
        </li>
        <li>
          <Link href="/courses/[id]" as={`/courses/${courseID}`}>
            <a>Gradebook</a>
          </Link>
        </li>
        <li>
          <Link href="/courses/[id]/people" as={`/courses/${courseID}/people`}>
            <a>People</a>
          </Link>
        </li>
      </ul>

      <style jsx>
        {`
          .course-header {
            margin-bottom: 28px;
          }
          ul {
            list-style: none;
          }
          li {
            display: inline-block;
            margin-right: 16px;
          }
          a {
            color: #000;
            text-decoration: none;
          }
        `}
      </style>
    </div>
  );
}
