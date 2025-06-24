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
  const templateDir = path.join(process.cwd(), "src/app/templates");
  const folders = fs.readdirSync(templateDir);
  
  for (const folder of folders) {
    
    const metaPath = path.join(templateDir, folder, "meta.json");
    const raw = fs.readFileSync(metaPath, "utf-8");
    const meta = JSON.parse(raw);

    const exists = await prisma.templates.findUnique({
      where: { templateCode: meta.templateCode },
    });

    if (exists) continue;

    const existing = await prisma.templates.create({
      data: {
        templateCode: meta.templateCode,
        templateType: meta.templateType,
        title: meta.title,
        description: meta.description,
      },
    });
    
  }
  
  return { status: true, resDataType: "success", data: "" };
  
}
