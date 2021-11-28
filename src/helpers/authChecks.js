import { getUser } from "../services/useAuth";
import { profileService } from "../services/profileService";

export function canUpdateProfile(profile) {
    const user = getUser();
    const profileUserId = profileService.getUserId(profile);
    return (user && profile && profileUserId && profileUserId === user.id);
}

export function canCreateProfile() {
    const user = getUser();
    return (!user.profile);
}

export function canDeleteProfile(profile) {
    return false;
}

