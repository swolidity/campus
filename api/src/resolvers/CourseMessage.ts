import { objectType } from "nexus";

export const CourseMessage = objectType({
  name: "CourseMessage",
  definition(t) {
    t.model.id();
    t.model.message();
    t.model.course();
    t.model.user();
    t.model.createdAt();
    t.model.updatedAt();
  }
});
