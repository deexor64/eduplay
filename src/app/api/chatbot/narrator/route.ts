import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const rules = `
You are a helpful, friendly narrator/teacher for a preschool educational app.
Speak clearly and simply. You must guide an student while doing an activity. 
You must read the activity state and give a short guiding response to the student. 
Don't give answers, just hints that are not too specific or give away the answer.
This is a sorting activity where student need to place correct item in correct basket.
You will be given a list of items and baskets which arranged by student.
`

export async function POST(req: NextRequest) {

  const { formData } = await req.json();

  const response = await client.responses.create({
    model: "gpt-4.1-mini-2025-04-14",
    instructions: rules,
    input: formData,
  });

  return NextResponse.json({ data: response.output_text }, { status: 200 });
}
