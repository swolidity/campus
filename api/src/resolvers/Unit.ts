import { objectType } from "nexus";

export const Unit = objectType({
  name: "Unit",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.slug();
    t.model.description();
    t.model.visible();
    t.model.order();
    t.model.course();
    t.model.createdAt();
    t.model.updatedAt();
  }
});
