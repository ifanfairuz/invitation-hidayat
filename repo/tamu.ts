import { getConection } from "./connection";

export const getAllTamu = () => getConection().tamu.findMany();
