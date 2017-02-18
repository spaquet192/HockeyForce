public with sharing class UserInfoController {
    
    private class UserData {
        String userName {get; set;}
        String email {get; set;}
        String userId {get; set;}
        
        private UserData(string name, string email, string userId) {
            this.userName = name;
            this.email = email;
            this.userId = userId;
        }
    }

  @AuraEnabled
  public static String getUserData() {
      UserData userData = new UserData(userinfo.getUserName(),userinfo.getUserEmail(),userInfo.getUserId());
      return JSON.serialize(userData);
  }

}