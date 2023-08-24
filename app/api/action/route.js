import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// POST
export async function POST(request) {
  // Replace the uri string with your connection string.
  let { action, slug, initialQuantity } = await request.json();
  const uri =
    "mongodb+srv://stockmanagement:YXc74xfi6zJK1UT6@cluster0.q1wguwi.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const filter = { slug: slug };
    let newQuantity =
      action == "plus"
        ? parseInt(initialQuantity) + 1
        : parseInt(initialQuantity) - 1;
    const updateDoc = {
      $set: {
        quantity: newQuantity,
      },
    };
    const result = await inventory.updateOne(filter, updateDoc, {});
    console.log(result);
    return NextResponse.json({
      success: true,
      message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
