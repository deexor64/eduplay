import { NextRequest, NextResponse } from 'next/server';
import userListService from '@/services/user-management/userListService';
import { UserType } from '@/lib/utils/types';

export async function GET(req: NextRequest) {
  
  try {
    
    const users: UserType[] = ["ADMIN", "TEACHER"];
    const searchParams = req.nextUrl.searchParams;
    
    // check user type
    const userType = searchParams.get("userType") as UserType;
    
    if (!users.includes(userType)) {
      return NextResponse.json(
        { status: false, responseType: "log", data: "Invalid usertype" },
        { status: 400 }
      );
    }
    
    // query database
    let query = await userListService(searchParams);
    if (!query.status) return NextResponse.json(
      query,
      { status: 500 }
    );
    
    return NextResponse.json(
      query, 
      { status: 200 }
    );
  
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { status: false, responseType: "log", data: "Internal server error."},
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
