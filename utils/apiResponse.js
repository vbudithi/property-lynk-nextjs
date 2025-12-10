import { NextResponse } from "next/server";

//200 OK → Standard success response with data
export const successResponse = (data) =>
  NextResponse.json({ success: true, data }, { status: 200 });

// 201 Created → Resource successfully created (e.g., after POST)
export const created = (data) =>
  NextResponse.json({ success: true, data }, { status: 201 });

// 204 No Content → Success but no response body (e.g., after DELETE)
export const noContent = () => NextResponse.json(null, { status: 204 });

// 400 Bad Request → Invalid input or malformed request
export const badRequest = (message) =>
  NextResponse.json({ success: false, error: message }, { status: 400 });

// 403 Forbidden → Authenticated but not allowed to access
export const forbidden = (message = "Forbidden") =>
  NextResponse.json({ success: false, error: message }, { status: 403 });

// 404 Not Found → Resource doesn’t exist
export const notFound = (message = "Not Found") =>
  NextResponse.json({ success: false, error: message }, { status: 404 });

// 409 Conflict → Resource conflict (e.g., duplicate entry)
export const conflict = (message = "Conflict") =>
  NextResponse.json({ success: false, error: message }, { status: 409 });

// 401 Unauthorized → User not authenticated
export const unauthorized = (message = "Unauthorized") =>
  NextResponse.json({ success: false, error: message }, { status: 401 });

// 500 Internal Server Error → Unexpected server failure
export const serverError = (message = "Something  went wrong") =>
  NextResponse.json({ success: false, error: message }, { status: 500 });
