-- CreateTable
CREATE TABLE "CommentaryLog" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentaryLog_pkey" PRIMARY KEY ("id")
);
