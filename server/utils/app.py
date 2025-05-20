#!/usr/bin/env python3
from fastapi import Depends
from sqlalchemy.orm import Session

from .db import get_db

db_session:Session = Depends(get_db)
