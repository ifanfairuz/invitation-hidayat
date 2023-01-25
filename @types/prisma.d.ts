type InsertAI<T, id extends string = "id"> = Omit<
  T,
  id | "createdAt" | "updatedAt"
>;
