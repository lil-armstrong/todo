from fastapi import APIRouter

from utils.app import db_session
from controllers.profile import Profile
from schemas.profile import ProfileCreate, ProfileUpdate, ProfileRead

router = APIRouter()
controller = Profile()


@router.post(
    "/",
    name="create_profile",
    response_model=ProfileRead,
)
async def create_profile(payload: ProfileCreate, db=db_session):
    """Create a new profile"""
    return controller.create(payload=payload, db=db)


@router.get(
    "/",
    name="read_profile",
    response_model=list[ProfileRead],
)
async def read_profile(db=db_session):
    return controller.read(db)


@router.get(
    "/me",
    name="read_current_profile",
    description="Read current authenticated user profile",
    response_model=ProfileRead,
)
async def read_me(db=db_session):
    return controller.me(db)


@router.patch(
    "/{profile_id}",
    name="update_profile",
    response_model=ProfileRead,
)
async def update_profile(payload: ProfileUpdate, db=db_session):
    return controller.update(payload, db)


@router.delete(
    "/{profile_id}",
    name="delete_profile",
    summary="Delete a profile",
)
async def delete_profile(profile_id: int, db=db_session):
    return controller.delete(profile_id, db)
