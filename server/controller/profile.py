from sqlalchemy.orm import Session

from schemas.profile import ProfileCreate, ProfileUpdate

class Profile:
    def create(self, payload:ProfileCreate, db:Session):
        pass

    def read(self, db:Session):
        pass
    
    def me(self, db:Session):
        pass

    def update(self, payload:ProfileUpdate, db:Session):
        pass

    def delete(self, profile_id:int, db:Session):
        pass

