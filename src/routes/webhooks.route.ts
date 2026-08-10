import express, { Router, type Request, type Response } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { UserModel } from "../models/user.model.ts";

const router = Router();

router.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    let evt;
    try {
      evt = await verifyWebhook(req);
    } catch (err) {
      console.error("Clerk webhook verification failed:", err);
      return res.status(400).send("Invalid webhook signature");
    }

    if (evt.type === "user.created") {
      await UserModel.create({
        user_clerkId: evt.data.id,
        email: evt.data.email_addresses?.[0]?.email_address ?? "",
        firstName: evt.data.first_name ?? "",
        lastName: evt.data.last_name ?? "",
        role: "Student",
        user_rating: 0,
        profile_image: evt.data.image_url ?? "",
      });
    }

    res.status(200).send("Webhook received");
  },
);

export default router;
