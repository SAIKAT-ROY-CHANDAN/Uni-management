import { TAcademicSemester } from "./academic.interface";
import { AcademicSemester } from "./academic.model";

const createAcademicSemesterIntoDB = async (payload:TAcademicSemester) => {
    const result = await AcademicSemester.create(payload)

    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}