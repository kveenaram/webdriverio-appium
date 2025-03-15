class LoginScreen {
    get inputUsername() {
      return $('~test-Username');
    }
  

    get inputPassword() {
       return $('~test-Password');
    }

  
    get btnLogin() {
      return $('~test-LOGIN');
    }
  
    get errorMessageText() {
      return $('android=new UiSelector().text("Username and password do not match any user in this service.")');
    }   

    async waitForErrorMessage() {
      await this.errorMessageText.waitForDisplayed({ timeout: 5000 });
      return this.errorMessageText;
    }
      
    async login(username, password) {
      await this.inputUsername.setValue(username);
      await this.inputPassword.setValue(password);
      await this.btnLogin.click();
    }
  }
  
  module.exports = new LoginScreen();