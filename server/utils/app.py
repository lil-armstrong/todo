#!/usr/bin/env python3
from fastapi import Depends
from sqlalchemy.orm import Session

from utils.db import get_db

db_session:Session = Depends(get_db)
