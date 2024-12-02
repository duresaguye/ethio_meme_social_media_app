// File: src/app/api/auth/signup/route.js

export async function POST(req) {
  try {
    // Parse the incoming JSON body
    const body = await req.json();
    const { username, password, email } = body;

    // Example: Log the received data (replace with your logic)
    console.log("Received signup data:", { username, password, email });

    // Example response (replace with your actual signup logic)
    return new Response(
      JSON.stringify({ message: "Signup successful!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in signup route:", error);

    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
