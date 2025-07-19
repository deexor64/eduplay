import { prisma } from '@/lib/prisma';
import { ResType, UserType } from '@/lib/utils/types';
import fs from "fs";
import path from "path";


export default async function syncService(): Promise<ResType> {
  
  const templateDir = path.join(process.cwd(), "src/templates");
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
        sampleActivity: meta.sampleActivity,
      },
    });
    
  }
  
  return { status: true, resDataType: "success", data: "Successfully synced templates" };
  
}
