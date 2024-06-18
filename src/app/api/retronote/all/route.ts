import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const result = await prisma.retro.deleteMany({});
    return NextResponse.json({ message: 'All retros deleted successfully', count: result.count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Internal server error: ${error}` }, { status: 500 });
  }
}
