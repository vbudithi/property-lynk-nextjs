import { NextResponse } from "next/server";

/*SUCCESS RESPONSES*/

//200 OK → Standard success response with data
export const successResponse = (data) =>
  NextResponse.json({ success: true, data }, { status: 200 });

// 201 Created → Resource successfully created (e.g., after POST)
export const created = (data) =>
  NextResponse.json({ success: true, data }, { status: 201 });

// 204 No Content → Success but no response body (e.g., after DELETE)
export const noContent = () => NextResponse.json(null, { status: 204 });

/*CLIENT ERRORS*/

// 400 Bad Request → Invalid input or malformed request
export const badRequest = (message = "Bad Request", code = "BAD_REQUEST") =>
  NextResponse.json({ success: false, code, message }, { status: 400 });

//400 - Self messaging error
export const selfMessageError = (
  message = "Cannot send a message to yourself"
) =>
  NextResponse.json(
    {
      success: false,
      code: "SELF_MESSAGE",
      message,
    },
    { status: 400 }
  );

// 401 Unauthorized → User not authenticated
export const unauthorized = (message = "You must be logged in") =>
  NextResponse.json(
    {
      success: false,
      code: "AUTH_REQUIRED",
      message,
    },
    { status: 401 }
  );

// 403 Forbidden → Authenticated but not allowed to access
export const forbidden = (message = "Forbidden", code = "FORBIDDEN") =>
  NextResponse.json({ success: false, code, message }, { status: 403 });

// 404 Not Found → Resource doesn’t exist
export const notFound = (message = "Resource not found", code = "NOT_FOUND") =>
  NextResponse.json(
    {
      success: false,
      code,
      message,
    },
    { status: 404 }
  );

// 409 Conflict → Resource conflict (e.g., duplicate entry)
export const conflict = (message = "Conflict", code = "CONFLICT") =>
  NextResponse.json({ success: false, code, message }, { status: 409 });

// 500 Internal Server Error → Unexpected server failure
export const serverError = (
  message = "Something went wrong",
  code = "SERVER_ERROR"
) => NextResponse.json({ success: false, code, message }, { status: 500 });
