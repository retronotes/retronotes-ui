import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {user_id,retro_name } = await req.json();
    const newRetro = await prisma.retro.create({
      data: {
        user_id,
        retro_name,
        what_went_well: [],
        what_went_wrong: [],
        action_item: [],
      },
    });
    return NextResponse.json({ data: newRetro, message: 'New retronote is created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Internal server error: ${error}` }, { status: 500 });
  }
}

