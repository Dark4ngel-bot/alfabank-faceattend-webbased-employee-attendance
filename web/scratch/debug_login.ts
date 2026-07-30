import { prisma } from "../src/lib/prisma";
import { verifyPassword, createToken } from "../src/lib/auth";
import { isCreativemuEmail } from "../src/lib/creativemu-email";
import { deactivateExpiredEmployee } from "../src/lib/employment-period";

async function debugLogin() {
  const email = "admin@creativemu.id";
  const password = "admin123";

  try {
    console.log("1. Checking email domain...");
    console.log("Is valid email domain:", isCreativemuEmail(email));

    console.log("2. Checking rate limit table...");
    try {
      const rows = await prisma.$queryRaw`
        SELECT attempt_count, reset_at
        FROM login_rate_limits
        WHERE rate_limit_key = 'test'
        LIMIT 1
      `;
      console.log("Rate limit query ok:", rows);
    } catch (e) {
      console.error("RATE LIMIT QUERY ERROR:", e);
    }

    console.log("3. Finding user...");
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("User found:", user?.email);

    if (user) {
      console.log("4. Checking deactivateExpiredEmployee...");
      try {
        const isDeactivated = await deactivateExpiredEmployee(user);
        console.log("isDeactivated:", isDeactivated);
      } catch (e) {
        console.error("deactivateExpiredEmployee ERROR:", e);
      }

      console.log("5. Verifying password...");
      const isValid = await verifyPassword(password, user.password_hash);
      console.log("isValidPassword:", isValid);

      console.log("6. Creating token...");
      const token = await createToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      console.log("Token created ok:", token ? "YES" : "NO");
    }
  } catch (err) {
    console.error("DEBUG LOGIN CAUGHT ERROR:", err);
  }
}

debugLogin().finally(() => prisma.$disconnect());
