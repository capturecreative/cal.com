/*
Warnings:
  - A unique constraint covering the columns `[idempotencyKey,userId,eventTypeId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
*/
-- DropIndex
DROP INDEX "public"."Booking_idempotencyKey_key";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_idempotencyKey_userId_eventTypeId_key" ON "public"."Booking"("idempotencyKey", "userId", "eventTypeId");
