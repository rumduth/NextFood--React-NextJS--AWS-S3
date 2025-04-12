import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";
import {
  getAllMeals,
  getMeal as getMEAL,
  saveMeal as saveMEAL,
} from "@/connection/database";
const s3 = new S3({
  region: "us-east-2",
});

export async function getMeals() {
  let res = await getAllMeals();
  return res;
}

export async function getMeal(slug) {
  let res = await getMEAL(slug);
  return res;
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
  await saveMEAL(meal);
}
