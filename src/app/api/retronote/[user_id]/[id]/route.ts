import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const {id } = params;
  try {
    const retro = await prisma.retro.findUnique({
      where: {
        id,
      },
    });

    if (retro) {
      return NextResponse.json(retro, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Retro not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Internal server error: ${error}` }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
      const retro = await prisma.retro.delete({
        where: { id },
      });  
      return NextResponse.json({ message: 'Retro deleted successfully', retro }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: `Internal server error: ${error}` }, { status: 500 });
    }
  }
