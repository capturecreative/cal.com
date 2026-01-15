import { v5 as uuidv5 } from "uuid";

export class IdempotencyKeyService {
  static generate({
    startTime,
    endTime,
    userId,
    reassignedById,
    title = null,
    email = null,
  }: {
    startTime: Date | string;
    endTime: Date | string;
    userId?: number;
    reassignedById?: number | null;
  }) {
    if (process.env.DISABLE_CONFLICT_CHECKING === "true") {
      return uuidv5(
        `${startTime.valueOf()}.${endTime.valueOf()}.${userId}${reassignedById ? `.${reassignedById}` : ""}${
          email ? `.${email}` : ""
        }${title ? `.${title}` : ""}`,
        uuidv5.URL
      );
    }
    return uuidv5(
      `${startTime.valueOf()}.${endTime.valueOf()}.${userId}${reassignedById ? `.${reassignedById}` : ""}`,
      uuidv5.URL
    );
  }
}
