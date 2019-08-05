import { ApolloServer } from "apollo-server";
import Photon from "@generated/photon";
import { nexusPrismaPlugin } from "@generated/nexus-prisma";
import { makeSchema, objectType } from "@prisma/nexus";
import { join } from "path";
import { Context } from "./types";

const photon = new Photon();

const nexusPrisma = nexusPrismaPlugin({
  photon: ctx => ctx.photon
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.findOneUser();
    t.crud.findManyUser();
  }
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.crud.createOneUser();
    t.crud.updateOneUser();
    t.crud.deleteOneUser();
    t.crud.upsertOneUser();
  }
});

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.name();
    t.model.createdAt();
    t.model.updatedAt();
  }
});

const schema = makeSchema({
  types: [Query, Mutation, User, nexusPrisma],
  outputs: {
    typegen: join(__dirname, "../generated/nexus-typegen.ts"),
    schema: join(__dirname, "../generated/schema.graphql")
  },
  typegenAutoConfig: {
    sources: [
      {
        source: "@generated/photon",
        alias: "photon"
      },
      {
        source: join(__dirname, "types.ts"),
        alias: "ctx"
      }
    ],
    contextType: "ctx.Context"
  }
});

const server = new ApolloServer({
  schema,
  context: { photon }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
