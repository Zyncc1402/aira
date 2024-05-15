import { Prisma } from "@prisma/client";

export type Products = Prisma.ProductGetPayload<{
  include: { quantity: true };
}>;

export type UserWithReviews = Prisma.UserGetPayload<{
  include: { reviews: true };
}>;
