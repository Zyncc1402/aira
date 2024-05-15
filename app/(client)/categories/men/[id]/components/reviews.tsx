import Image from "next/image";
import ReviewForm from "./reviewForm";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export default async function Reviews({ id }: { id: string }) {
  const session = await auth();
  const review = await prisma.reviews.findMany({
    where: {
      productId: id,
    },
    include: {
      user: true,
    },
  });
  const alreadyReviewed = await prisma.user.findUnique({
    where: {
      id: session?.user.id || id,
    },
    include: {
      reviews: true,
    },
  });
  const result = alreadyReviewed?.reviews.find(
    (review) => review.productId == id
  );
  return (
    <div className="container mt-[100px]">
      <h1 className="text-2xl font-semibold">Reviews</h1>
      <div>
        <ReviewForm id={id} alreadyReviewed={!!result} />
        {review.map((review) => (
          <div
            className="mt-5 rounded-lg p-4 bg- max-w-[768px] bg-gray-50"
            key={review.userId}
          >
            <div className="flex gap-2 items-center justify-start">
              <Image
                src={review.user.avatar || ""}
                width={30}
                height={30}
                alt="Profile Picture"
                className="rounded-full"
                priority
              />
              <h1 className="font-semibold">{review.user.name}</h1>
            </div>
            <h1 className="font-medium mt-3">{review.title}</h1>
            <p className="mt-3 text-[15px] line-clamp-[7] md:line-clamp-4 lg:line-clamp-3">
              {review.description}
            </p>
            <div className="flex gap-3 mt-5 flex-wrap">
              {review.images &&
                review.images.map((image) => (
                  <Image
                    key={image}
                    src={image}
                    width={80}
                    height={80}
                    alt="review image"
                    priority
                    className="rounded-md aspect-square object-cover"
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
