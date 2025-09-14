-- AlterTable
ALTER TABLE "public"."BusHistory" ALTER COLUMN "delay" DROP NOT NULL,
ALTER COLUMN "eta" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "BusHistory_route_idx" ON "public"."BusHistory"("route");

-- CreateIndex
CREATE INDEX "BusHistory_createdAt_idx" ON "public"."BusHistory"("createdAt");

-- CreateIndex
CREATE INDEX "BusHistory_busId_createdAt_idx" ON "public"."BusHistory"("busId", "createdAt");
