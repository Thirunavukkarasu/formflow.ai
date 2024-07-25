-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "profile_image" TEXT,
    "tier" TEXT DEFAULT 'Free',
    "credits" TEXT DEFAULT '10',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "local_google_id" TEXT,
    "google_resource_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_local_google_id_key" ON "users"("local_google_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_resource_id_key" ON "users"("google_resource_id");
