import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

const ADMIN_PASSWORD = "AP@2005";
const ADMIN_TOKEN = "hustle-hives-admin-token-2024";

// Get all reviews
app.get("/api/reviews", async (c) => {
  const db = c.env.DB;
  const result = await db
    .prepare("SELECT * FROM reviews ORDER BY created_at DESC")
    .all();
  return c.json(result.results || []);
});

// Submit a new review
app.post("/api/reviews", async (c) => {
  const db = c.env.DB;
  const body = await c.req.json<{ name: string; rating: number; message: string }>();

  const { name, rating, message } = body;

  if (!name || !message || !rating) {
    return c.json({ error: "Name, rating, and message are required" }, 400);
  }

  if (rating < 1 || rating > 5) {
    return c.json({ error: "Rating must be between 1 and 5" }, 400);
  }

  await db
    .prepare(
      "INSERT INTO reviews (name, rating, message, created_at, updated_at) VALUES (?, ?, ?, datetime('now'), datetime('now'))"
    )
    .bind(name.trim(), rating, message.trim())
    .run();

  return c.json({ success: true }, 201);
});

// Admin login
app.post("/api/admin/login", async (c) => {
  const body = await c.req.json<{ password: string }>();

  if (body.password === ADMIN_PASSWORD) {
    return c.json({ token: ADMIN_TOKEN });
  }

  return c.json({ error: "Invalid password" }, 401);
});

// Delete a review (admin only)
app.delete("/api/admin/reviews/:id", async (c) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (token !== ADMIN_TOKEN) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const db = c.env.DB;
  const id = c.req.param("id");

  await db.prepare("DELETE FROM reviews WHERE id = ?").bind(id).run();

  return c.json({ success: true });
});

export default app;
