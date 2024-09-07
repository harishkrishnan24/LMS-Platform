import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { courseId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await request.json();

    const ownCourse = await db.course.findUnique({
      where: { id: params.courseId, userId },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return new NextResponse("Reordered successfully", { status: 200 });
  } catch (error) {
    console.error(`[REORDER]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
