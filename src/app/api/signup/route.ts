import { NextRequest, NextResponse } from 'next/server';
import teacherService from '@/lib/services/signup/teacher';

const signupHandlers: { [key: string]: (body: any) => Promise<any> } = {
  teacher: teacherService,
  // parent: parentSignup,
};

export async function POST(req: NextRequest) {
  
  try {
    
    const body = await req.json();
    const handler = signupHandlers[body.userType];
    
    // choose handler based on user type
    if (!handler) {
      return NextResponse.json(
        { status: false, responseType: "log", data: "Invalid usertype" },
        { status: 400 }
      );
    }
    
    // query database
    let query = await handler(body.formData);
    if (!query.status) return NextResponse.json(
      query,
      { status: 500 }
    );
    
    return NextResponse.json(
      query, 
      { status: 200 }
    );
  
  } catch (err: any) {
    return NextResponse.json(
      { status: false, responseType: "log", data: "Internal server error: " + err },
      { status: 500 }
    );
  }
  
}



// const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1]; // "Bearer <token>"

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     // Token is valid, proceed
//     res.status(200).json({
//       message: 'Authenticated! Here is your milkshake.',
//       milkshake: { flavor: 'chocolate', size: 'large' },
//       user: decoded,
//     });
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// }
