import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
const db = sql("meals.db");
import { S3 } from "@aws-sdk/client-s3";
const s3 = new S3({
  region: "us-east-2",
});

export async function getMeals() {
  await new Promise((res) => setTimeout(res, 2000));
  // throw new Error("loading meal error");
  return db
    .prepare(
      `
    SELECT * FROM meals
    `
    )
    .all();
}

export async function getMeal(slug) {
  await new Promise((res) => setTimeout(res, 1000));
  return db
    .prepare(
      `
      SELECT * FROM meals
      WHERE slug = ?
      `
    )
    .get(slug);
}

export async function saveMeal(meal) {
  await new Promise((res) => setTimeout(res, 1000));
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.type.split("/").pop();
  const fileName = `${meal.slug}${Math.random().toFixed(5)}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "first-next-js-with-food-application-demo-user-images",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
