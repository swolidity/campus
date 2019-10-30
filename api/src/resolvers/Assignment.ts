import { objectType } from "nexus";

export const Assignment = objectType({
  name: "Assignment",
  definition(t) {
    t.model.id();
    t.model.course();
    t.model.name();
    t.model.points();
    t.model.createdAt();
    t.model.updatedAt();
  }
});
