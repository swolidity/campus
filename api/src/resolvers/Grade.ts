import { objectType } from "nexus";

export const Grade = objectType({
  name: "Grade",
  definition(t) {
    t.model.id();
    t.model.points();
    t.model.course();
    t.model.createdAt();
    t.model.updatedAt();
  }
});
