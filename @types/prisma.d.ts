type InsertAI<T, id extends string = "id"> = Omit<
  T,
  id | "createdAt" | "updatedAt"
>;
type UpdateAI<T, id extends string = "id"> = Partial<InsertAI<T>>;
