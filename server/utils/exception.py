from pydantic import ValidationError
from fastapi import HTTPException


def handle_request_exception(e: Exception, status_code: int = 500):
    is_validation_error = isinstance(e, ValidationError)
    detail = e if is_validation_error else ""
    print(e)
    raise HTTPException(status_code=status_code, detail=detail)
    raise HTTPException
