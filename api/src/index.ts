import { ApolloServer, GraphQLUpload } from "apollo-server";
import { Photon } from "@generated/photon";
import { nexusPrismaPlugin } from "nexus-prisma";
import { makeSchema, objectType, asNexusMethod, arg } from "nexus";
import { rule, shield, and, or, not } from "graphql-shield";
import { applyMiddleware } from "graphql-middleware";
import { join } from "path";
import { Context } from "./types";
import * as types from "./resolvers";
import jwt from "jsonwebtoken";
import express = require("express");

const Upload = asNexusMethod<any>(GraphQLUpload, "upload");

const photon = new Photon();

const nexusPrisma = nexusPrismaPlugin({
  photon: ctx => ctx.photon
});

const getUser = async (photon: Photon, token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) return null;

      let user;

      try {
        user = await photon.users.findOne({
          where: {
            id: decoded.id
          }
        });
      } catch (e) {
        throw new Error("User does not exist.");
      }

      return user;
    }
  );
};

// Rules
const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null;
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === "ADMIN";
  }
);

// Permissions
const permissions = shield({
  Mutation: {
    addUserToCourse: and(isAuthenticated, isAdmin)
  }
});

const schema = applyMiddleware(
  makeSchema({
    types: { ...types, Upload },
    plugins: [nexusPrisma],
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
  }),
  permissions
);

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    // get the user token from the headers
    let token = req.headers.authorization || "";

    let user = null;

    if (token) {
      if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }

      // try to retrieve a user with the token
      user = await getUser(photon, token);
    }

    return { photon, user };
  }
});

server.listen().then(url => {
  console.log(`🚀 Server ready at ${url}`);
});
