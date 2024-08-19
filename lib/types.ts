import {Prisma} from "@prisma/client";

export type Products = Prisma.ProductGetPayload<{
    include: { quantity: true };
}>;

export type UserWithReviews = Prisma.UserGetPayload<{
    include: { reviews: true };
}>;

export type UserWithAddress = Prisma.UserGetPayload<{
    include: { address: true };
}>;

export type CartWithCartItems = Prisma.CartGetPayload<{
    include: {
        items: {
            include: {
                product: {
                    include: {
                        quantity: true
                    }
                };
            };
        };
    };
}>;
