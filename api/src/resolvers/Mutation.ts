import { mutationType, arg } from "nexus";
import csv from "csvtojson";
import slug from "slug";

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.updateOneUser();
    t.crud.deleteOneUser();
    t.crud.upsertOneUser();

    t.crud.createOneCourse();
    t.crud.updateOneCourse();
    t.crud.deleteOneCourse();
    t.crud.upsertOneCourse();

    t.crud.createOneAssignment();
    t.crud.updateOneAssignment();
    t.crud.upsertOneAssignment();
    t.crud.deleteOneAssignment();

    t.crud.createOneUnit();
    t.crud.updateOneUnit();
    t.crud.upsertOneUnit();
    t.crud.deleteOneUnit();

    t.field("createCourse", {
      type: "Course",
      args: { data: arg({ type: "CourseCreateInput" }) },
      resolve: async (root, args, ctx) => {
        return await ctx.photon.courses.create({
          data: {
            slug: slug(args.data.name + " " + args.data.term),
            ...args.data
          }
        });
      }
    });

    t.field("removeUserFromCourse", {
      type: "User",
      args: {
        user_id: arg({ type: "ID" }),
        course_id: arg({ type: "ID" })
      },
      resolve: async (root, { user_id, course_id }, ctx) => {
        const userInCourse = await ctx.photon.users
          .findOne({
            where: { id: user_id }
          })
          .courses({
            where: {
              id: course_id
            }
          });

        if (userInCourse.length != 0) {
          const user = await ctx.photon.users.update({
            where: {
              id: user_id
            },
            data: {
              courses: {
                disconnect: { id: course_id }
              }
            }
          });

          return user;
        }

        throw new Error("User already not in course.");
      }
    });

    t.field("addUserToCourse", {
      type: "User",
      args: {
        user_id: arg({ type: "ID" }),
        course_id: arg({ type: "ID" })
      },
      resolve: async (root, { user_id, course_id }, ctx) => {
        const userInCourse = await ctx.photon.users
          .findOne({
            where: { id: user_id }
          })
          .courses({
            where: {
              id: course_id
            }
          });

        if (userInCourse.length === 0) {
          const user = await ctx.photon.users.update({
            where: {
              id: user_id
            },
            data: {
              courses: {
                connect: { id: course_id }
              }
            }
          });

          return user;
        }

        throw new Error("User already in course.");
      }
    });

    t.field("createCourseMessage", {
      type: "CourseMessage",
      args: {
        course_id: arg({ type: "ID" }),
        message: arg({ type: "String" })
      },
      resolve: async (root, { message, course_id }: any, ctx) => {
        return await ctx.photon.courseMessages.create({
          data: {
            course: { connect: { id: course_id } },
            user: { connect: { id: ctx.user.id } },
            message
          }
        });
      }
    });

    t.field("uploadCourseRoster", {
      type: "String",
      args: {
        file: arg({ type: "Upload" })
      },
      resolve: async (root, { file }, ctx) => {
        const { createReadStream, filename, mimetype, encoding } = await file;
        if (!filename) {
          throw Error("Invalid file Stream");
        }
        const ext = filename.split(".").pop();
        if (ext !== "csv") {
          throw Error("File not valid, must be a .csv file");
        }
        const buf = await readFS(createReadStream());
        const roster = await csv().fromString(buf.toString());

        for (const user of roster) {
          let class_number = parseInt(user["Class Nbr"]);

          if (user.Component === "LEC")
            class_number = parseInt(user["Catalog Nbr"]);

          const newCourse = await ctx.photon.courses.upsert({
            where: { class_number },
            update: {
              name: `${user.Subject} ${user["Catalog Nbr"]} ${user.Component}`,
              term: parseInt(user.Term),
              slug: slug(
                `${user.Subject} ${user["Catalog Nbr"]} ${user.Component} ${user["Class Nbr"]}` +
                  parseInt(user.Term)
              ),
              subject: user.Subject,
              catalog_number: parseInt(user["Catalog Nbr"]),
              component: user.Component,
              class_number: class_number
            },
            create: {
              name: `${user.Subject} ${user["Catalog Nbr"]} ${user.Component}`,
              term: parseInt(user.Term),
              slug: slug(
                `${user.Subject} ${user["Catalog Nbr"]} ${user.Component} ${user["Class Nbr"]}` +
                  parseInt(user.Term)
              ),
              subject: user.Subject,
              catalog_number: parseInt(user["Catalog Nbr"]),
              component: user.Component,
              class_number: class_number
            }
          });

          const newUser = await ctx.photon.users.upsert({
            where: { email: user.Email },
            update: {
              name: `${user["First Name"]} ${user.Last}`,
              email: user.Email
            },
            create: {
              name: `${user["First Name"]} ${user.Last}`,
              email: user.Email
            }
          });

          const userInCourse = await ctx.photon.users
            .findOne({
              where: { id: newUser.id }
            })
            .courses({
              where: {
                class_number: {
                  equals: newCourse.class_number
                }
              }
            });

          if (userInCourse.length === 0) {
            const linkCourse = await ctx.photon.users.update({
              where: { id: newUser.id },
              data: {
                courses: {
                  connect: { id: newCourse.id }
                }
              }
            });
          }
        }

        return "woohooo!";
      }
    });
  }
});

const readFS = (stream: {
  on: (
    arg0: string,
    arg1: (data: any) => number
  ) => { on: (arg0: string, arg1: () => void) => void };
}) => {
  let chunkList: any[] | Uint8Array[] = [];
  return new Promise<any>((resolve, reject) =>
    stream
      .on("data", data => chunkList.push(data))
      .on("end", () => resolve(Buffer.concat(chunkList)))
  );
};
