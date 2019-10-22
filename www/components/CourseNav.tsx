import NextLink from "../components/Link";
import { Link } from "@chakra-ui/core";

export default function CourseNav({ courseID }) {
  return (
    <div className="course-header">
      <ul>
        <li>
          <NextLink
            activeClassName="active"
            href="/courses/[id]"
            as={`/courses/${courseID}`}
          >
            <Link>Home</Link>
          </NextLink>
        </li>
        <li>
          <NextLink
            activeClassName="active"
            href="/courses/[id]/content"
            as={`/courses/${courseID}/content`}
          >
            <Link>Content</Link>
          </NextLink>
        </li>
        <li>
          <NextLink
            activeClassName="active"
            href="/courses/[id]/gradebook"
            as={`/courses/${courseID}/gradebook`}
          >
            <Link>Gradebook</Link>
          </NextLink>
        </li>
        <li>
          <NextLink
            activeClassName="active"
            href="/courses/[id]/people"
            as={`/courses/${courseID}/people`}
          >
            <Link>People</Link>
          </NextLink>
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
