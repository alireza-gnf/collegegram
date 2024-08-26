import { z } from "zod";
import { zodPostId } from "../../model/post-id";
import { zodInt, zodPositiveInt } from "../../../../data/int";

export const GetCommentsSchema = z.object({
  postId: zodPostId,
  page: zodPositiveInt,
  take: zodInt,
  baseUrl: z.string().min(1),
});

export type GetCommentsDto = z.infer<typeof GetCommentsSchema>;