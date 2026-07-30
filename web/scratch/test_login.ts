async function testLogin() {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@creativemu.id",
        password: "admin123",
      }),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE STATUS:", res.status);
    console.log("LOGIN RESPONSE DATA:", data);
  } catch (err) {
    console.error("LOGIN ERROR:", err);
  }
}

testLogin();
