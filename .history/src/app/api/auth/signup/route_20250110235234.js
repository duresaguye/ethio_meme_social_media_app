export async function POST(req) {
  try {
    const body = await req.json();
    const response = await fetch("http://localhost:8000/api/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return new Response(
        JSON.stringify({ message: "Signup successful!" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      const errorData = await response.json();
      return new Response(JSON.stringify(errorData), { status: response.status });
    }
  } catch (error) {
    console.error("Error in signup route:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
