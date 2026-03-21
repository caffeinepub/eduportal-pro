import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type UserId = Principal;

  module UserProfile {
    public type UserRole = AccessControl.UserRole;
    public type UserProfile = {
      name : Text;
      email : Text;
      role : UserRole;
    };
  };
  type UserProfile = UserProfile.UserProfile;

  // Authentication
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
};
