"use server";

import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import userPermissionCheck from "@/lib/utils/userPermissionCheck";

export async function syncTemplates(token: string) {
  
  const userPermissions = await userPermissionCheck(token, ["TEACHER"], ["ADMIN"], ["ACTIVE"]);
  if (!userPermissions.status) throw new Error("Unauthorized");

  try {
    
    // Templates are dynamically listed 
    const templateDir = path.join(process.cwd(), "src/templates");
    const folders = fs.readdirSync(templateDir);
    
    for (const folder of folders) {
      
      // skip non template folders
      if (folder.split("-")[2] !== "tmpl") continue;
      
      const metaPath = path.join(templateDir, folder, "meta.json");
      const raw = fs.readFileSync(metaPath, "utf-8");
      const meta = JSON.parse(raw);
      
      // Check is template already synced
      const template = await prisma.template.findUnique({
        where: { templateCode: meta.templateCode },
      });
  
      if (template) continue;
      
      // Repeated db query inside a for loop is one time
      await prisma.template.create({
        data: {
          templateCode: meta.templateCode,
          title: meta.title,
          description: meta.description,
          templateType: meta.templateType,
          sampleActivity: meta.sampleActivity,
        },
      });
      
    }
  } catch(e) {
    throw new Error("Failed to sync templates");
  }
 
}
