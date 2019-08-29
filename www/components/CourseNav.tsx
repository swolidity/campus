import Link from "../components/Link";

export default function CourseNav({ courseID }) {
  return (
    <div className="course-header">
      <ul>
        <li>
          <Link
            activeClassName="active"
            href="/courses/[id]"
            as={`/courses/${courseID}`}
          >
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link
            activeClassName="active"
            href="/courses/[id]/content"
            as={`/courses/${courseID}/content`}
          >
            <a>Content</a>
          </Link>
        </li>
        <li>
          <Link
            activeClassName="active"
            href="/courses/[id]/gradebook"
            as={`/courses/${courseID}/gradebook`}
          >
            <a>Gradebook</a>
          </Link>
        </li>
        <li>
          <Link
            activeClassName="active"
            href="/courses/[id]/people"
            as={`/courses/${courseID}/people`}
          >
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
          .active {
            border-bottom: 1px solid;
          }
        `}
      </style>
    </div>
  );
}
