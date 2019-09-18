import { objectType } from "nexus";

export const Course = objectType({
  name: "Course",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.term();
    t.model.slug();
    t.model.title();
    t.model.class_number();
    t.model.users();
    t.model.createdAt();
    t.model.updatedAt();
  }
});
