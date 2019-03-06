import Hashids from "hashids";

const HASHID_SLAT = "any-poem";

const hashids = new Hashids(HASHID_SLAT, 6);

const encodeId = (id: number) => {
  return hashids.encode(id);
};

const decodeId = (id: string) => {
  return hashids.decode(id);
};

export { encodeId, decodeId };
