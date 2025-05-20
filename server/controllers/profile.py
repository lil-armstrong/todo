from sqlalchemy.orm import Session

from schemas.profile import ProfileCreate, ProfileUpdate
from utils.exception import handle_request_exception


class Profile:
    def create(self, payload: ProfileCreate, db: Session):
        try:
            pass
        except Exception as e:
            handle_request_exception(e)

    def read(self, db: Session):
        try:
            pass
        except Exception as e:
            handle_request_exception(e)

    def me(self, db: Session):
        try:
            pass
        except Exception as e:
            handle_request_exception(e)

    def update(self, payload: ProfileUpdate, db: Session):
        try:
            pass
        except Exception as e:
            handle_request_exception(e)

    def delete(self, profile_id: int, db: Session):
        try:
            pass
        except Exception as e:
            handle_request_exception(e)
