import { TErrorSource, TGenericResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericResponse => {
    const match = err.message.match(/"([^"]*)"/)

    const extractedMessage = match && match[1]

    const errorSources: TErrorSource = [
        {path: '',
         message: `${extractedMessage} is already exists`
        }
    ]

    const statusCode = 400

    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    }

}

export default handleDuplicateError