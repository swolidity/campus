import { objectType, arg } from "nexus";

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.user();
    t.crud.users();

    t.crud.course();
    t.crud.courses();

    t.crud.coursemessage();
    t.crud.coursemessages();

    t.field("findCourse", {
      type: "Course",
      args: {
        id: arg({ type: "String" })
      },
      resolve: async (root, { id }, ctx) => {
        const courses = await ctx.photon.courses.findMany({
          where: { OR: [{ id }, { slug: id }] }
        });
        return courses[0];
      }
    });

    // TODO: return only users that are NOT in specified Course
    t.list.field("usersNotInCourse", {
      type: "User",
      args: {
        name: arg({ type: "String" })
      },
      resolve: async (root, { name }, ctx) => {
        const users = await ctx.photon.users.findMany({
          first: 10,
          where: {
            name: {
              contains: name
            }
          }
        });

        return users;
      }
    });

    t.field("loggedInUser", {
      type: "User",
      nullable: true,
      resolve: async (root, args, ctx) => {
        return ctx.user;
      }
    });

    t.list.field("getCoursePeople", {
      type: "User",
      args: {
        course_id: arg({ type: "String" })
      },
      resolve: async (root, { course_id }, ctx) => {
        const users = await ctx.photon.courses
          .findOne({
            where: {
              id: course_id
            }
          })
          .users();

        return users;
      }
    });

    t.list.field("getCourseMessages", {
      type: "CourseMessage",
      args: {
        course_id: arg({ type: "ID" })
      },
      resolve: async (root, { course_id }, ctx) => {
        return await ctx.photon.courseMessages.findMany({
          where: {
            course: {
              id: course_id
            }
          }
        });
      }
    });
  }
});
