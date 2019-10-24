import NextLink from "../components/Link";
import { Link } from "@chakra-ui/core";

export default function CourseNav({ slug }) {
  return (
    <div className="course-header">
      <ul>
        <li>
          <NextLink
            activeClassName="active"
            href="/courses/[id]"
            as={`/courses/${slug}`}
          >
            <Link>Home</Link>
          </NextLink>
        </li>
        <li>
          <NextLink
            activeClassName="active"
            href="/courses/[id]/content"
            as={`/courses/${slug}/content`}
          >
            <Link>Content</Link>
          </NextLink>
        </li>
        <li>
          <NextLink
            activeClassName="active"
            href="/courses/[id]/gradebook"
            as={`/courses/${slug}/gradebook`}
          >
            <Link>Gradebook</Link>
          </NextLink>
        </li>
        <li>
          <NextLink
            activeClassName="active"
            href="/courses/[id]/people"
            as={`/courses/${slug}/people`}
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
