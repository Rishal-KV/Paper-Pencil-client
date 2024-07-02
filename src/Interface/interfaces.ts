export interface Student {
  _id?: string;
  name: string;
  email?: string;
  number?: number | string;
  is_blocked?: boolean;
  is_Verified?: boolean;
  about?: string;
  googleId?: string;
  profileImage?: string;
  googleAuth?:boolean
}
type CategoryType =  { name: string; _id: string };

export interface Course {
  _id?: string;
  name?: string;
  price?: number;
  category?: CategoryType | string;
  description?: string;
  instructor?: Instructor;
  approved?: Boolean;
  listed?: Boolean;
  image?: string | undefined | Blob ;
  adminVerified?: boolean;
  publish?: boolean;
  questions?: string[];
  createdAt? : Date 
}

export interface chapter {
  _id?: string;
  title: string;
  description:string;
  lessons?: any[];
  course?: Course;
  order:number|string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Review {
  review: string;
  rating: number ;
  courseId: string | null;
}

export interface Instructor {
  _id?: string
  name: string;
  email?: string;
  password?: string;
  is_blocked?: boolean;
  phone?: number | string;
  is_verified?: boolean;
  imageUrl?: string;
  about?: string;
  googleId?: string;
  googleAuth?:boolean
}

export interface category {
  _id: string;
  name: string;
  is_blocked: boolean;
}

export interface Enrollment {
  _id?:string
  course: Course;
  studentId: Student;
  date: any;
  completedChapters: [];
  completedLessons: [];
  completedDate : Date
  courseStatus:boolean
  enrolled : Date
}

export interface Lesson {
  _id?: string;
  title: string;
  videoUrl: string;
  chapterId: string;
  createdAt?: Date;
}

export interface Favourites {
  studentId: string;
  favourites: string[];
}

export interface Question{
  _id? : string
  question: string;
  options: string[];
  correctOption: string;
  courseId:string
}

export interface studentType {
  student : {
    student : Student
  }
}

export interface InstructorType {
  instructor : {
    instructor : Instructor
  }
}

export interface StudentChat  {
  _id:string
   instructorDetails : Instructor
   updatedAt : Date
   latestMessage : string
}

export interface InstructorChat {
  _id:string,
  studentDetails:Student,
  updatedAt : Date
  latestMessage : string
}

export interface ExtFile {
  file: File;
  name: string;
  size: number;
  type: string;
  lastModified : number
}