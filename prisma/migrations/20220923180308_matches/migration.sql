-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "sourceUserId" TEXT NOT NULL,
    "sinkUserId" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_sourceUserId_fkey" FOREIGN KEY ("sourceUserId") REFERENCES "RegisterUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_sinkUserId_fkey" FOREIGN KEY ("sinkUserId") REFERENCES "RegisterUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
