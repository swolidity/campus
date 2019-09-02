import Photon, { User } from "@generated/photon";

export interface Context {
  photon: Photon;
  user: User;
}
