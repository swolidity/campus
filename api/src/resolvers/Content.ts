import { objectType } from "nexus";

export const Content = objectType({
  name: "Content",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.text();
    t.model.type();
    t.model.course();
    t.model.createdAt();
    t.model.updatedAt();
  }
});
