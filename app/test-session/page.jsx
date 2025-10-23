"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TestSessionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Session Debug Info</h1>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="font-semibold text-lg mb-2">Status:</h2>
              <p
                className={`text-2xl font-bold ${
                  status === "authenticated"
                    ? "text-green-600"
                    : status === "loading"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {status.toUpperCase()}
              </p>
            </div>

            {status === "authenticated" && session && (
              <>
                <div className="border-b pb-4">
                  <h2 className="font-semibold text-lg mb-2">User Info:</h2>
                  <div className="bg-gray-50 p-4 rounded">
                    <p>
                      <strong>Name:</strong> {session.user?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong> {session.user?.email || "N/A"}
                    </p>
                    <p>
                      <strong>Image:</strong>{" "}
                      {session.user?.image ? "✅ Yes" : "❌ No"}
                    </p>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h2 className="font-semibold text-lg mb-2">
                    Full Session Object:
                  </h2>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto text-xs">
                    {JSON.stringify(session, null, 2)}
                  </pre>
                </div>
              </>
            )}

            {status === "unauthenticated" && (
              <div className="bg-red-50 border border-red-200 p-4 rounded">
                <p className="text-red-700 font-semibold">
                  ❌ You are not logged in!
                </p>
                <p className="text-sm text-red-600 mt-2">
                  Please sign in from the homepage to test protected routes.
                </p>
              </div>
            )}

            {status === "loading" && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                <p className="text-yellow-700">⏳ Loading session...</p>
              </div>
            )}

            <div className="pt-4">
              <h2 className="font-semibold text-lg mb-4">
                Test Protected Routes:
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/properties/add")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Test: Go to Add Property
                </button>

                <button
                  onClick={() => router.push("/profile")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Test: Go to Profile
                </button>

                <button
                  onClick={() => router.push("/messages")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Test: Go to Messages
                </button>

                <button
                  onClick={() => router.push("/")}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📝 Instructions:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Check if status shows "AUTHENTICATED" (green)</li>
            <li>If not authenticated, go to homepage and sign in</li>
            <li>Come back to this page and verify session</li>
            <li>Try clicking the test buttons above</li>
            <li>Check browser console for middleware logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
