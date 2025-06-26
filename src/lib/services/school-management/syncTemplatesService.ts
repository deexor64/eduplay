import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import syncTemplatesValidator from '@/lib/validators/school-management/syncTemplatesValidator';
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default async function syncTemplatesService(searchParams: any): Promise<ResType> {
  
  // schema valdiation
  const valid = await syncTemplatesValidator(searchParams);
  if (!valid.status) return valid;
  
  // query
  const templateDir = path.join(process.cwd(), "src/app/template");
  const folders = fs.readdirSync(templateDir);
  
  for (const folder of folders) {
    
    if (folder.split("-")[2] !== "tmpl") continue; // skip non template folders
    
    const metaPath = path.join(templateDir, folder, "meta.json");
    const raw = fs.readFileSync(metaPath, "utf-8");
    const meta = JSON.parse(raw);

    const exists = await prisma.template.findUnique({
      where: { templateCode: meta.templateCode },
    });

    if (exists) continue;

    const existing = await prisma.template.create({
      data: {
        templateCode: meta.templateCode,
        title: meta.title,
        description: meta.description,
        templateType: meta.templateType,
        sampleLesson: meta.sampleLesson,
      },
    });
    
  }
  
  return { status: true, resDataType: "success", data: "" };
  
}
