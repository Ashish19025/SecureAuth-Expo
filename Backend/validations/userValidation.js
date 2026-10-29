const { z } = require("zod");

module.exports.syncSchema = z.object({
  clerkId: z.string(),
  email: z.string().email(),
  firstName: z.string().min(3),
  lastName: z.string().min(3)
})