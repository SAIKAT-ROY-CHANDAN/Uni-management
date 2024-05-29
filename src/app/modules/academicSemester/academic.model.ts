import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academic.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academic.constants";



const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: { type: String, enum: AcademicSemesterName, required: true },
    code: { type: String, enum: AcademicSemesterCode, required: true},
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months },
    endMonth: { type: String, enum: Months },
})

export const AcademicSemester = model<TAcademicSemester>(
    'AcademicSemester', academicSemesterSchema
)