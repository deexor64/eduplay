"use server";

import { cookies } from "next/headers";
import { TeacherRoleEnum } from "@/lib/utils/types";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function syncTemplates() {
  
  const cookieStore = await cookies();
  
  const userToken = cookieStore.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER"],
    [TeacherRoleEnum.ADMIN, TeacherRoleEnum.MASTER]);

  if (!valid) throw new Error("Unauthorized");

  try {

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
  } catch(e) {
    throw new Error("Failed to sync templates");
  }
 
}
