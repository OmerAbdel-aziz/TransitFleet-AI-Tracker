-- CreateTable
CREATE TABLE "public"."BusHistory" (
    "id" SERIAL NOT NULL,
    "busId" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "delay" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusHistory_pkey" PRIMARY KEY ("id")
);
