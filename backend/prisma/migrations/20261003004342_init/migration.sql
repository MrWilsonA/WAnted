-- CreateTable
CREATE TABLE "case_files" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL DEFAULT '',
    "body" TEXT NOT NULL DEFAULT '',
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonies" (
    "id" SERIAL NOT NULL,
    "case_file_id" INTEGER,
    "name" VARCHAR(60) NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimonies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "case_files_code_key" ON "case_files"("code");

-- CreateIndex
CREATE UNIQUE INDEX "case_files_slug_key" ON "case_files"("slug");

-- CreateIndex
CREATE INDEX "testimonies_case_file_id_idx" ON "testimonies"("case_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "testimonies" ADD CONSTRAINT "testimonies_case_file_id_fkey" FOREIGN KEY ("case_file_id") REFERENCES "case_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
