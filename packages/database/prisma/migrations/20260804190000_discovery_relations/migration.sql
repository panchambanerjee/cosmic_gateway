-- CreateTable
CREATE TABLE "discovery_relations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "discovery_id" UUID NOT NULL,
    "related_id" UUID NOT NULL,
    "note" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discovery_relations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "discovery_relations_related_id_idx" ON "discovery_relations"("related_id");

-- CreateIndex
CREATE UNIQUE INDEX "discovery_relations_discovery_id_related_id_key" ON "discovery_relations"("discovery_id", "related_id");

-- AddForeignKey
ALTER TABLE "discovery_relations" ADD CONSTRAINT "discovery_relations_discovery_id_fkey" FOREIGN KEY ("discovery_id") REFERENCES "discoveries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovery_relations" ADD CONSTRAINT "discovery_relations_related_id_fkey" FOREIGN KEY ("related_id") REFERENCES "discoveries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
